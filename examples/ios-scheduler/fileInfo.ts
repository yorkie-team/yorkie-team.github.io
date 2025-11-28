import { DirectoryInfo } from '@/utils/exampleFileUtils';

export const FILE_INFO: DirectoryInfo = {
  "isFile": false,
  "name": "Scheduler",
  "path": "/",
  "children": [
    {
      "isFile": true,
      "isOpen": false,
      "language": "swift",
      "name": "ContentView.swift",
      "path": "/ContentView.swift",
      "content": `

import SwiftUI

struct ContentView: View {
    @State var viewModel = ViewModel()
    @State private var selectedDate: Date?
    @State private var newEvent = ""

    var body: some View {
        VStack {
            CalendarViewWrapper(
                selectedDate: $selectedDate,
                eventDates: self.$viewModel.scheduledDates
            )
            .frame(height: 450)

            Spacer()

            if let selectedDate {
                VStack {
                    ScrollView {
                        self.makeDateDetail(selectedDate)
                            .padding()
                    }
                    .scrollIndicators(.hidden, axes: .vertical)

                    Spacer()
                    self.eventEditing
                }
            }
        }
        .padding()
        .task {
            await self.viewModel.initializeClient()
        }
    }

    @ViewBuilder
    func makeDateDetail(_ date: Date) -> some View {
        let events = self.viewModel.schedulers[date] ?? []

        VStack {
            ForEach(events, id: \\.uuid) { event in
                EventDetailView(event: event.text, updateEvent: { updated in
                    guard let selectedDate else { return }
                    updateEvent(event, at: selectedDate, withNewText: updated)
                }) {
                    guard let selectedDate else { return }
                    deleteEvent(event, date: selectedDate)
                }
            }
        }
    }

    var eventEditing: some View {
        VStack {
            if let date = selectedDate {
                let stringDate = self.viewModel.dateFormater.string(from: date)
                Text("Date: \\(stringDate)")
            }

            TextField("Add Event", text: self.$newEvent)

            Button {
                addEvent(self.newEvent, to: self.selectedDate)
            } label: {
                Text("Add Event")
            }
            .disabled(self.newEvent.isEmpty)
        }
    }
}

extension ContentView {
    func addEvent(_ event: String, to date: Date?) {
        guard let date else { return }
        self.viewModel.addEvent(event, at: date)
        // clear event name after adding
        self.newEvent = ""
    }

    func deleteEvent(_ event: Event, date: Date) {
        self.viewModel.deleteEvent(event, date: date)
    }

    func updateEvent(
        _ event: Event,
        at date: Date,
        withNewText text: String
    ) {
        self.viewModel.updateEvent(event, at: date, withNewText: text)
    }
}

#Preview {
    ContentView()
}`
    },
    {
      "isFile": true,
      "isOpen": false,
      "language": "swift",
      "name": "ContentViewModel.swift",
      "path": "/ContentViewModel.swift",
      "content": `
@Observable
class ViewModel {
    @ObservationIgnored private var client: Client
    @ObservationIgnored private let document: Document
    private(set) var state = ContentState.loading
    var schedulers = [Date: [Event]]()
    var dateFormater: DateFormatter = {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = Constant.Format.dateFormat
        dateFormatter.locale = Constant.Format.local
        return dateFormatter
    }()

    var scheduledDates = [Date]()

    init() {
        self.client = Client(Constant.serverAddress)
        self.document = Document(key: Constant.documentKey)
    }

    func initializeClient() async {
        self.state = .loading
        do {
            try await self.client.activate()

            let doc = try await client.attach(self.document)
            self.updateScheduler(from: doc)
            self.state = .success

            await self.watch()
        } catch {
            self.state = .error(.cannotInitClient("\\(error.localizedDescription)"))
        }
    }

    func watch() async {
        self.document.subscribe { [weak self] event, document in
            guard let self else { return }
            if case .syncStatusChanged = event.type {
                self.updateScheduler(from: document)
            }
        }
    }

    func updateScheduler(from document: Document) {
        guard let array = document.getRoot().content as? JSONArray else { return }
        let iterator = array.makeIterator()
        var dates = [Date: [Event]]()
        while let object = iterator.next() as? JSONObject {
            let date = object.get(key: "date") as? String
            let text = object.get(key: "text") as? String
            guard let date, let text else { fatalError() }
            guard let d = dateFormater.date(from: date) else { return }

            if dates[d] == nil {
                dates[d] = [.init(id: object.getID(), text: text)]
            } else {
                dates[d]?.append(.init(id: object.getID(), text: text))
            }
        }

        self.schedulers = dates
        self.updateScheduledDates()
    }

    func deleteEvent(_ event: Event, date: Date) {
        try? self.document.update { root, _ in
            guard let lists = root.content as? JSONArray else { return }
            lists.remove(byID: event.id)
        }
    }

    func addEvent(
        _ name: String,
        at date: Date
    ) {
        try? self.document.update { root, _ in
            guard let lists = root.content as? JSONArray else { return }
            let formattedDate = self.dateFormater.string(from: date)
            let model = ScheduleModel(date: formattedDate, text: name)

            lists.append(model)
        }
    }

    func updateScheduledDates() {
        self.scheduledDates = [Date](self.schedulers.keys)
    }

    func updateEvent(
        _ event: Event,
        at date: Date,
        withNewText text: String
    ) {
        try? self.document.update { root, _ in
            guard let lists = root.content as? JSONArray else { return }
            let iterator = lists.makeIterator()
            let formattedDate = self.dateFormater.string(from: date)

            while let next = iterator.next() as? JSONObject {
                if next.getID() == event.id, (next.get(key: "date") as? String ?? "") == formattedDate {
                    next.set(key: "text", value: text)
                    return
                }
            }
        }
    }
}`
    },
    {
      "isFile": true,
      "isOpen": false,
      "language": "swift",
      "name": "CalendarViewWrapper.swift",
      "path": "/CalendarViewWrapper.swift",
      "content": `

import SwiftUI
import UIKit

struct CalendarViewWrapper: UIViewRepresentable {
    @Binding var selectedDate: Date?
    @Binding var eventDates: [Date]
    var calendarView = UICalendarView()

    func makeUIView(context: Context) -> UICalendarView {
        self.calendarView.calendar = Calendar(identifier: .gregorian)
        self.calendarView.tintColor = .systemBlue
        self.calendarView.delegate = context.coordinator
        self.calendarView.selectionBehavior = UICalendarSelectionSingleDate(delegate: context.coordinator)

        return self.calendarView
    }

    func updateUIView(_ uiView: UICalendarView, context: Context) {
        var dateComponents = [DateComponents]()
        for date in context.coordinator.eventDates + self.eventDates {
            let dateComponent = Calendar(identifier: .gregorian)
                .dateComponents(in: .current, from: date)
            dateComponents.append(dateComponent)
        }

        context.coordinator.eventDates = self.eventDates
        uiView.reloadDecorations(forDateComponents: dateComponents, animated: true)
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, UICalendarSelectionSingleDateDelegate, UICalendarViewDelegate {
        var parent: CalendarViewWrapper
        var eventDates = [Date]()

        init(_ parent: CalendarViewWrapper) {
            self.parent = parent
        }

        func dateSelection(_ selection: UICalendarSelectionSingleDate, didSelectDate dateComponents: DateComponents?) {
            if let date = dateComponents?.date {
                self.parent.selectedDate = date
            }
        }

        func calendarView(
            _ calendarView: UICalendarView,
            decorationFor dateComponents: DateComponents
        ) -> UICalendarView.Decoration? {
            let day = DateComponents(
                calendar: dateComponents.calendar,
                year: dateComponents.year,
                month: dateComponents.month,
                day: dateComponents.day
            )

            if self.eventDates.contains(where: { $0 == day.date }) {
                let circle = UICalendarView.Decoration.image(
                    UIImage(systemName: "circle.fill"),
                    color: UIColor.red,
                    size: .large
                )

                return circle
            }
            return nil
        }
    }
}`
    },
    {
      "isFile": true,
      "isOpen": false,
      "language": "swift",
      "name": "EventDetailView.swift",
      "path": "/EventDetailView.swift",
      "content": `

import SwiftUI

struct EventDetailView: View {
    let event: String
    var updateEvent: (String) -> Void
    var deleteEvent: () -> Void

    @State var isEditing = false
    @State var textEditing = ""
    @FocusState var forcusField: Bool

    var body: some View {
        HStack {
            if self.isEditing {
                TextField("", text: self.$textEditing)
                    .focused(self.$forcusField)
            } else {
                Text(self.event)
            }

            Spacer()
            if self.isEditing {
                HStack {
                    Button {
                        self.updateEvent(self.textEditing)
                        self.toggleEditing(false)
                    } label: {
                        Text("Save")
                    }

                    Button {
                        self.toggleEditing(false)
                    } label: {
                        Text("Cancel")
                    }
                }
            } else {
                HStack {
                    Button {
                        self.toggleEditing(true)
                    } label: {
                        Image(systemName: "highlighter.badge.ellipsis")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20, alignment: .center)
                    }

                    Button {
                        self.deleteEvent()
                    } label: {
                        Image(systemName: "trash")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 20, height: 20, alignment: .center)
                    }
                }
            }
        }
        .padding(10)
        .background(
            RoundedRectangle(cornerRadius: 12)
                .stroke(Color.gray, lineWidth: 2)
        )
    }

    func toggleEditing(_ _isEditing: Bool) {
        withAnimation {
            self.isEditing = _isEditing
            self.forcusField = true
        }

        if self.isEditing {
            self.textEditing = self.event
        } else {
            self.textEditing = ""
        }
    }
}`
    }
  ]
};
