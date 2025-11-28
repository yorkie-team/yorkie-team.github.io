import { DirectoryInfo } from '@/utils/exampleFileUtils';

export const FILE_INFO: DirectoryInfo = {
  "isFile": false,
  "name": "ios-todomvc",
  "path": "/",
  "children": [
    {
      "isFile": false,
      "name": "TODO",
      "path": "/TODO",
      "children": [
        {
          "isFile": true,
          "isOpen": false,
          "language": "swift",
          "name": "TodomvcApp.swift",
          "path": "/TODO/TodomvcApp.swift",
          "content": `

import SwiftUI

@main
struct TodomvcApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    @Environment(\\.scenePhase) var scenePhase

    @State var key = Constant.documentKey

    var body: some Scene {
        WindowGroup {
            NavigationView {
                VStack {
                    Text("Input document key or use the default")
                    TextField(text: self.$key) {
                        Text("Input documentKey")
                    }

                    NavigationLink(destination: ContentView()) {
                        Text("Go")
                    }
                }
                .padding()
            }
            .navigationViewStyle(.stack)
        }.onChange(of: self.scenePhase) { newPhase in
            Log.log("[ChangePhase] -> \\(newPhase)", level: .debug)
        }
        .onChange(of: self.key) { newValue in
            Constant.documentKey = newValue
        }
    }
}

final class AppDelegate: NSObject, UIApplicationDelegate {
    func application(
        _: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        return true
    }
}
`
        },
        {
          "isFile": true,
          "isOpen": false,
          "language": "swift",
          "name": "ContentView.swift",
          "path": "/TODO/ContentView.swift",
          "content": `

import SwiftUI

struct ContentView: View {
    enum Status: String, Identifiable {
        var id: String { rawValue }

        case all = "All"
        case active = "Active"
        case completed = "Completed"
    }

    @StateObject private var viewModel = ContentViewModel()
    @State private var selectedStatus = Status.all
    @State private var showAdding = false
    @State private var showEditing = false
    @State private var selectedAll = false
    @State private var newTaskName = ""
    @State private var updatingModel: TodoModel? = nil
    @State var showSetting = false
    @State var key = ""
    @Environment(\\.scenePhase) var scenePhase

    private let status: [Status] = [.all, .active, .completed]
    var body: some View {
        Group {
            switch self.viewModel.state {
            case .error(let error):
                errorView(error)
            case .loading:
                loadingView
            case .success:
                content
            }
        }
        .onChange(of: self.scenePhase) { newPhase in
            if newPhase == .active {
                self.viewModel.refreshDocument()
            }
        }
        .task {
            await self.viewModel.initializeClient()
        }
        .sheet(isPresented: self.$showSetting) {
            VStack {
                HStack {
                    Spacer()
                    Button {
                        self.showSetting = false
                    } label: {
                        Image(systemName: "xmark")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 30, height: 30)
                    }
                }
                TextField(text: self.$key) {
                    Text("Input new key")
                }

                Button {
                    self.showSetting = false
                    self.viewModel.updateKeys(self.key)
                } label: {
                    Text("DONE")
                }

                Spacer()
            }
            .padding()
        }
    }
}

// MARK: - Views

extension ContentView {
    private var content: some View {
        VStack {
            self.headerView

            Spacer()

            ScrollView {
                let filteredModels: [TodoModel] = {
                    switch self.selectedStatus {
                    case .all:
                        return self.viewModel.models
                    case .active:
                        return self.viewModel.models.filter { !$0.completed }
                    case .completed:
                        return self.viewModel.models.filter { $0.completed }
                    }
                }()
                ForEach(filteredModels) { model in
                    HStack(spacing: 20) {
                        Button {
                            Log.log("[UI] -> task complete -> model.id: \\(model.id), complete: \\(!model.completed)", level: .info)
                            complete(model.id, complete: !model.completed)
                        } label: {
                            Image(systemName: model.completed ? "checkmark.circle" : "circle")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 25, height: 25, alignment: .center)
                        }

                        Button {
                            self.updatingModel = model
                            self.showEditing = true
                            self.newTaskName = model.text
                        } label: {
                            Text("\\(model.text)")
                                .strikethrough(model.completed)
                                .multilineTextAlignment(.leading)
                        }

                        Spacer()
                        Button {
                            Log.log("[UI] -> delete task -> model.id: \\(model.id)", level: .info)
                            self.viewModel.deleteItem(model.id)
                        } label: {
                            Image(systemName: "delete.left")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 20, height: 20, alignment: .center)
                                .foregroundStyle(Color.red)
                        }
                    }
                    .padding(.horizontal, 20)
                }
            }

            Spacer()

            HStack {
                if self.viewModel.itemsLeft > 0 {
                    Text("\\(self.viewModel.itemsLeft) item(s) left")
                } else {
                    Text("No items left")
                }

                if self.viewModel.models.contains(where: { $0.completed }) {
                    Button {
                        Log.log("[UI] -> remove all completed task", level: .info)
                        removeAllCompleted()
                    } label: {
                        HStack {
                            Image(systemName: "trash")
                                .resizable()
                                .scaledToFit()
                                .frame(width: 20, height: 20, alignment: .center)
                                .padding(.trailing, 10)
                            Text("Clear all completed task!")
                        }
                        .foregroundStyle(Color.red)
                        .padding(5)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .stroke(Color.red, lineWidth: 2)
                        )
                    }
                }
            }
        }
        .padding()
        .alert("Add New Todo", isPresented: self.$showAdding) {
            TextField("What needs to be done?", text: self.$newTaskName)
            HStack {
                Button {
                    addTask()
                    Log.log("[UI] -> Add new task: \\(self.newTaskName)", level: .info)
                    self.showAdding = false
                } label: {
                    Text("Confirm")
                }
                .disabled(self.newTaskName.isEmpty)

                Button {
                    Log.log("[UI] -> Cancel Add new task: \\(self.newTaskName)", level: .info)
                    self.showAdding = false
                } label: {
                    Text("Cancel")
                }
            }
        } message: {
            Text("Add new task to do here!")
        }
        .alert("Edit task name", isPresented: self.$showEditing) {
            TextField("What needs to be done?", text: self.$newTaskName)
            HStack {
                Button {
                    Log.log("[UI] -> Update task: \\(self.newTaskName)", level: .info)
                    update()
                    self.showEditing = false
                } label: {
                    Text("Close")
                }

                Button {
                    Log.log("[UI] -> Cancel update task: \\(self.newTaskName)", level: .info)
                    self.showEditing = false
                } label: {
                    Text("Cancel")
                }
            }
        } message: {
            Text("Add new task to do here!")
        }
        .navigationTitle("Todo")
        .onChange(of: self.viewModel.models) { newValue in
            Log.log("[UI] [VM] -> models: \\(newValue)", level: .info)
            let hasChanged = newValue.contains(where: { $0.completed == false })
            self.selectedAll = !hasChanged
        }
        .onChange(of: self.selectedAll) { newValue in
            Log.log("[UI] [VM] -> selectedAll: \\(newValue)", level: .info)
            if newValue == false {
                if self.viewModel.models.allSatisfy({ $0.completed == true }) {
                    self.viewModel.markAllAsComplete(newValue)
                }
                return
            }
            self.viewModel.markAllAsComplete(newValue)
        }
    }

    private func errorView(_ error: TDError) -> some View {
        Text("Error occur: \\(error.localizedDescription)")
    }

    private var loadingView: some View {
        ProgressView()
    }

    var headerView: some View {
        VStack {
            HStack {
                Spacer()
                Text(self.viewModel.appVersion)
            }
            HStack {
                Picker("", selection: self.$selectedStatus) {
                    ForEach(self.status) { pickerStatus in
                        Text("\\(pickerStatus.rawValue)")
                            .tag(pickerStatus)
                    }
                }
                // .pickerStyle(.palette)

                Spacer()
                Button {
                    Log.log("[UI] -> Show add new task", level: .info)
                    self.showAdding = true
                } label: {
                    Image(systemName: "plus")
                        .resizable()
                        .scaledToFit()
                        .padding(6)
                        .frame(width: 30, height: 30)
                        .padding(5)
                        .background(Color.green.opacity(0.3))
                        .cornerRadius(20)
                }
            }

            if !self.viewModel.models.isEmpty {
                Toggle(isOn: self.$selectedAll) {
                    Text("Marked all as complete!")
                }
            }
        }
    }
}

// MARK: - Functions

extension ContentView {
    private func addTask() {
        Log.log("[UI] -> addTask", level: .info)
        self.viewModel.addNewTask(self.newTaskName)
        self.newTaskName = ""
    }

    private func update() {
        Log.log("[UI] -> update task", level: .info)
        guard let model = updatingModel else { return }
        self.viewModel.updateTask(model.id, self.newTaskName)

        self.newTaskName = ""
    }

    private func complete(_ taskID: String, complete: Bool) {
        Log.log("[UI] -> marks as compled task", level: .info)
        self.viewModel.updateTask(taskID, complete: complete)
    }

    private func removeAllCompleted() {
        Log.log("[UI] -> remove all completed task", level: .info)
        self.viewModel.removeAllCompleted()
    }
}

#Preview {
    ContentView()
}
`
        },
        {
          "isFile": true,
          "isOpen": false,
          "language": "swift",
          "name": "ContentViewModel.swift",
          "path": "/TODO/ContentViewModel.swift",
          "content": `

import Combine
import Foundation
import Network
import Yorkie

enum ContentState {
    case loading
    case error(TDError)
    case success
}

extension ContentView {
    class ContentViewModel: ObservableObject {
        var appVersion: String {
            var version = ""
            if let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String {
                version.append(appVersion)
            } else {
                print("Could not retrieve app version.")
            }

            // Get the build number (CFBundleVersion)
            if let buildNumber = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String {
                version.append(" build ")
                version.append(buildNumber)
            } else {
                print("Could not retrieve build number.")
            }
            return version
        }

        private let monitor = NWPathMonitor()
        private let queue = DispatchQueue.global(qos: .background)

        var documentKey = Constant.documentKey
        private let jsonDecoder = JSONDecoder()
        private(set) var models = [TodoModel]() {
            didSet {
                self.itemsLeft = self.models.count(where: { $0.completed == false })
            }
        }

        @Published private(set) var itemsLeft = 0
        @Published private(set) var state = ContentState.loading
        private var client: Client
        private var document: Document
        @Published var networkConnected = false

        init() {
            self.client = Client(
                "https://yorkie-api-qa.navercorp.com",
                .init(apiKey: Constant.apiKey)
            )
            // use Local server
            // self.client = .init(Constant.serverAddress)
            self.document = Document(key: Constant.documentKey)

            Log.log("Document key: \\(Constant.documentKey)", level: .info)
            Log.log("API key: \\(Constant.apiKey)", level: .info)

            self.monitor.pathUpdateHandler = { [weak self] path in
                if path.status == .satisfied {
                    DispatchQueue.main.async {
                        self?.syncAfterReconnect()
                    }
                }
            }
            self.monitor.start(queue: self.queue)
        }
    }
}

extension ContentView.ContentViewModel {
    func initializeClient() async {
        Log.log("initializeClient", level: .debug)
        state = .loading
        do {
            try await client.activate()

            let doc = try await client.attach(self.document)

            try self.document.update { root, _ in
                var text = root.todos as? JSONArray
                if text == nil {
                    root.todos = JSONArray()
                    text = root.todos as? JSONArray
                } else {}
            }

            self.updateDoc(doc)

            state = .success

            await self.watch()
        } catch {
            state = .error(.cannotInitClient("\\(error.localizedDescription)"))
            Log.log("initializeClient error :\\(error.localizedDescription)", level: .error)
        }
    }

    func watch() async {
        self.document.subscribe { [weak self] event, document in
            Log.log("receive event: \\(event.type)", level: .debug)
            if case .syncStatusChanged = event.type {
                self?.updateDoc(document)
            } else if case .localChange = event.type {
                self?.updateDoc(document)
            }
        }
    }

    func updateKeys(_ key: String) {
        // let key = Constant.yesterDaydocumentKey
        guard self.documentKey != key else { return }
        self.documentKey = key
        Task {
            try await self.client.detach(self.document)
            self.document = Document(key: key)
            await self.initializeClient()
        }
    }

    func syncAfterReconnect() {
        Task {
            try await self.client.sync()
            try self.document.update { root, _ in
                guard let lists = root.todos as? JSONArray else {
                    Log.log("Can not cast todos to JSONArray", level: .error)
                    return
                }
                var _models = [TodoModel]()
                for i in lists {
                    guard let i = i as? JSONObject else { continue }
                    let completed = i.get(key: "completed") as? Bool
                    let id = i.get(key: "id") as? String
                    let text = i.get(key: "text") as? String

                    guard let completed, let id, let text else { return }
                    let model = TodoModel(completed: completed, id: id, text: text)
                    _models.append(model)
                }
                self.models = _models
            }
        }
    }

    func refreshDocument() {
        self.updateDoc(self.document)
    }

    func updateDoc(_ document: Document) {
        Log.log("update document", level: .debug)
        if let root = document.getRoot().todos as? JSONArray {
            var _models = [TodoModel]()
            let iterator = root.makeIterator()
            while let i = iterator.next() as? JSONObject {
                let completed = i.get(key: "completed") as? Bool
                let id = i.get(key: "id") as? String
                let text = i.get(key: "text") as? String

                guard let completed, let id, let text else { return }
                let model = TodoModel(completed: completed, id: id, text: text)
                _models.append(model)
            }
            self.models = _models
            Log.log("All models: \\(_models)", level: .debug)
        } else {
            Log.log("No todos key found!", level: .warning)
        }
    }

    func markAllAsComplete(_ value: Bool) {
        Log.log("markAllAsComplete: \\(value)", level: .debug)
        try? self.document.update { root, _ in
            guard let lists = root.todos as? JSONArray else { return }
            let iterator = lists.makeIterator()
            while let next = iterator.next() as? JSONObject {
                next.set(key: "completed", value: value)
            }
        }
    }

    func deleteItem(_ id: String) {
        Log.log("deleteItem: \\(id)", level: .debug)
        try? self.document.update { root, _ in
            guard let lists = root.todos as? JSONArray else {
                Log.log("can not convert todos to JSONArray: \\(String(describing: root.todos))", level: .error)
                return
            }
            let iterator = lists.makeIterator()
            while let next = iterator.next() as? JSONObject {
                guard let data = String(reflecting: next).data(using: .utf8) else { return }
                if let model = try? self.jsonDecoder.decode(TodoModel.self, from: data), model.id == id {
                    lists.remove(byID: next.getID())
                    Log.log("can not decode TodoModel to from data: \\(String(data: data, encoding: .utf8) ?? "NIL")", level: .error)
                } else {
                    Log.log("can not decode TodoModel to from data: \\(String(data: data, encoding: .utf8) ?? "NIL")", level: .error)
                }
            }
        }
    }

    func addNewTask(_ name: String) {
        Log.log("addNewTask: \\(name)", level: .debug)
        try? self.document.update { root, _ in
            let lists = root.todos as? JSONArray
            if lists == nil {
                Log.log("Init new task when this is the initial", level: .debug)
                root.todos = JSONArray()
            }
            guard let lists = root.todos as? JSONArray else {
                Log.log("Can not cast todos to JSONArray", level: .error)
                return
            }
            let model = TodoModel.makeTodo(with: name)

            lists.append(model)
        }
    }

    func updateTask(_ task: String, _ withNewName: String) {
        Log.log("updateTask: \\(task) -> \\(withNewName)", level: .debug)
        try? self.document.update { root, _ in
            guard let lists = root.todos as? JSONArray else {
                Log.log("Can not cast todos to JSONArray", level: .error)
                return
            }
            let iterator = lists.makeIterator()
            while let next = iterator.next() as? JSONObject {
                if (next.get(key: "id") as? String) == task {
                    next.set(key: "text", value: withNewName)

                    Log.log("Found task id: \\(task) -> \\(withNewName)", level: .debug)
                    break
                }
            }
        }
    }

    func updateTask(_ task: String, complete: Bool) {
        Log.log("updateTask: \\(task) -> complete: \\(complete)", level: .debug)
        try? self.document.update { root, _ in
            guard let lists = root.todos as? JSONArray else {
                Log.log("Can not cast todos to JSONArray", level: .error)
                return
            }
            for i in lists {
                if let object = i as? JSONObject, object.get(key: "id") as! String == task {
                    object.set(key: "completed", value: complete)
                    break
                }
            }
        }
    }

    func removeAllCompleted() {
        Log.log("removeAllCompleted", level: .debug)
        try? self.document.update { root, _ in
            guard let lists = root.todos as? JSONArray else { return }
            let iterator = lists.makeIterator()
            while let next = iterator.next() as? JSONObject {
                if (next.get(key: "completed") as? Bool) == true {
                    lists.remove(byID: next.getID())
                }
            }
        }
    }
}
`
        },
        {
          "isFile": false,
          "name": "Models",
          "path": "/TODO/Models",
          "children": [
            {
              "isFile": true,
              "isOpen": false,
              "language": "swift",
              "name": "TodoModel.swift",
              "path": "/TODO/Models/TodoModel.swift",
              "content": `import Combine
import Foundation
import Yorkie

struct TodoModel: Identifiable, Equatable, JSONObjectable {
    let completed: Bool
    let id: String
    let text: String
}

extension TodoModel {
    static func makeTodo(with taskName: String) -> Self {
        .init(completed: false, id: UUID().uuidString, text: taskName)
    }
}
`
            }
          ]
        }
      ]
    }
  ]
};
