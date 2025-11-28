import { DirectoryInfo } from '@/utils/exampleFileUtils';

export const FILE_INFO: DirectoryInfo = {
  "isFile": false,
  "name": "ios-simultaneous-cursors",
  "path": "/",
  "children": [
    {
      "isFile": false,
      "name": "SimutaneousCursors",
      "path": "/SimutaneousCursors",
      "children": [
        {
          "isFile": true,
          "isOpen": false,
          "language": "swift",
          "name": "ContentView.swift",
          "path": "/SimutaneousCursors/ContentView.swift",
          "content": `

import SwiftUI

struct LineShape: Shape {
    var points: [CGPoint]

    func path(in rect: CGRect) -> Path {
        var path = Path()
        guard self.points.count > 1 else { return path }

        path.move(to: self.points[0])
        for point in self.points.dropFirst() {
            path.addLine(to: point)
        }
        return path
    }
}

struct LineDrawingView: View {
    let positions: [CGPoint]
    var body: some View {
        LineShape(points: self.positions)
            .stroke(Color.black, lineWidth: 3)
    }
}

struct ContentView: View {
    let name: String
    @State var viewModel = ContentViewModel()
    @State private var dragOffset: CGSize = .zero
    @State var currentPosition = CGPoint(x: 0, y: 0)
    @State var isTouchDown = false

    init(name: String) {
        self.name = name
    }

    var body: some View {
        ZStack {
            Color.white.opacity(0.1)
                .onTapGesture { location in
                    self.viewModel.currentTimer?.invalidate()
                    self.viewModel.currentTimer = nil

                    let isTouchDownInsideX = location.x > self.currentPosition.x - 40 && location.x < self.currentPosition.x + 40
                    let isTouchDownInsideY = location.y > self.currentPosition.y - 40 && location.y < self.currentPosition.y + 40

                    self.isTouchDown = true
                    self.changePosition(location, isTouchDown: isTouchDownInsideX && isTouchDownInsideY)
                    if isTouchDownInsideX && isTouchDownInsideY {
                        self.viewModel.currentTimer = Timer.scheduledTimer(withTimeInterval: 3, repeats: false) { _ in
                            self.changePosition(location, isTouchDown: false)
                        }
                    }
                    self.currentPosition = location
                }
                .gesture(self.dragGesture)
            self.canvasView
            self.menuView

            VStack {
                Text(self.name)
                    .foregroundStyle(Color.white)
                    .padding(3)
                    .background(Color.red)
                    .cornerRadius(2)
                Image(systemName: self.viewModel.currentCursor.systemImageName)
                    .foregroundStyle(
                        Color(
                            uiColor: .init(
                                red: self.viewModel.currentCursor.color.r,
                                green: self.viewModel.currentCursor.color.g,
                                blue: self.viewModel.currentCursor.color.b,
                                alpha: 1
                            )
                        )
                    )
            }
            .position(self.viewModel.currentCursor == .pen ? .init(x: self.currentPosition.x + 20, y: self.currentPosition.y - 20) : self.currentPosition)
            .overlay {
                if self.isTouchDown, self.viewModel.currentCursor != .cursor, self.viewModel.currentCursor != .pen {
                    AnimationView(
                        shape: self.viewModel.currentCursor,
                        position: .init(
                            x: self.currentPosition.x,
                            y: self.currentPosition.y
                        )
                    )
                }
            }

            ForEach(self.viewModel.drawingNames, id: \.self) { name in
                let drawingPath = self.viewModel.paths[name] ?? []
                LineDrawingView(positions: drawingPath)
            }
        }
        .ignoresSafeArea()
        .task {
            await self.viewModel.initializeClient(with: self.name)
        }
        .onDisappear {
            Task {
                await self.viewModel.deactivate()
            }
        }
    }

    private var loadingView: some View {
        ProgressView()
    }

    private func errorView(_ error: TDError) -> some View {
        Text("Error occur: \(error.localizedDescription)")
    }

    var canvasView: some View {
        Group {
            ForEach(self.viewModel.uiPresenecs) { peer in
                VStack {
                    Text(peer.presence.name)
                        .foregroundStyle(Color.white)
                        .padding(3)
                        .background(Color.red)
                        .cornerRadius(2)
                    Image(systemName: peer.presence.cursorShape.systemImageName)
                        .resizable()
                        .scaledToFit()
                        .foregroundStyle(
                            Color(
                                uiColor: .init(
                                    red: peer.presence.cursorShape.color.r,
                                    green: peer.presence.cursorShape.color.g,
                                    blue: peer.presence.cursorShape.color.b,
                                    alpha: 1
                                )
                            )
                        )
                        .frame(width: 20, height: 20)
                }
                .position(
                    x: peer.presence.cursor.xPos + (peer.presence.cursorShape == .pen ? 20 : 0),
                    y: peer.presence.cursor.yPos + (peer.presence.cursorShape == .pen ? -20 : 0)
                )
                .overlay {
                    if peer.presence.pointerDown, peer.presence.cursorShape != .cursor, peer.presence.cursorShape != .pen {
                        AnimationView(
                            shape: peer.presence.cursorShape,
                            position: .init(
                                x: peer.presence.cursor.xPos,
                                y: peer.presence.cursor.yPos
                            )
                        )
                    }
                }
            }
        }
    }

    var dragGesture: some Gesture {
        DragGesture()
            .onChanged { value in
                self.dragOffset = value.translation
                self.currentPosition = value.location
                self.changePosition(self.currentPosition, isTouchDown: self.viewModel.currentCursor == .pen)
            }
            .onEnded { _ in
                withAnimation(.bouncy) {
                    self.dragOffset = .zero
                }
                self.isTouchDown = false
                self.changePosition(self.currentPosition, isTouchDown: false)
            }
    }

    var menuView: some View {
        VStack {
            Spacer()

            HStack {
                Group {
                    Button {
                        self.viewModel.currentCursor = .heart
                    } label: {
                        Image(systemName: CursorShape.heart.systemImageName)
                            .resizable()
                            .scaledToFit()
                            .foregroundStyle(Color.red)
                            .background(Color.white)
                    }
                    Button {
                        self.viewModel.currentCursor = .thumbs
                    } label: {
                        Image(systemName: CursorShape.thumbs.systemImageName)
                            .resizable()
                            .scaledToFit()
                            .foregroundStyle(Color.yellow)
                            .background(Color.white)
                    }

                    Button {
                        self.viewModel.currentCursor = .pen
                    } label: {
                        Image(systemName: CursorShape.pen.systemImageName)
                            .resizable()
                            .scaledToFit()
                            .foregroundStyle(Color.black)
                            .background(Color.white)
                    }

                    Button {
                        self.viewModel.currentCursor = .cursor
                    } label: {
                        Image(systemName: CursorShape.cursor.systemImageName)
                            .resizable()
                            .scaledToFit()
                            .foregroundStyle(Color.black)
                            .background(Color.white)
                    }
                }
                .frame(width: 28, height: 28)
                .padding(12)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.red, lineWidth: 2)
                )
            }

            Text("\\(self.viewModel.uiPresenecs.count) users here!")
        }
    }

    func changePosition(_ position: CGPoint, isTouchDown: Bool) {
        self.viewModel.updatePosition(position, isTouchDown: isTouchDown)
    }
}

struct HeartView: View {
    let shape: CursorShape
    let position: CGPoint
    init(shape: CursorShape, position: CGPoint) {
        self.shape = shape
        self.position = position
    }

    @State var offsetY: CGFloat = 0
    @State var opacity: CGFloat = 1
    var body: some View {
        Image(systemName: self.shape.systemImageName)
            .resizable()
            .scaledToFit()
            .foregroundStyle(Color(uiColor: .init(red: self.shape.color.r, green: self.shape.color.g, blue: self.shape.color.b, alpha: 1)))
            .frame(width: 20, height: 20)
            .opacity(self.opacity)
            .position(x: self.position.x, y: self.position.y + self.offsetY)
            .onAppear {
                withAnimation(.easeOut(duration: 5)) {
                    self.offsetY = -100
                    self.opacity = 0
                }
            }
    }
}

struct AnimationView: View {
    let shape: CursorShape
    let position: CGPoint
    @State var timer: Timer?

    @State private var hearts: [UUID] = []
    var body: some View {
        VStack {
            ZStack {
                ForEach(self.hearts, id: \.self) { _ in
                    HeartView(shape: self.shape, position: .init(x: self.position.x + .random(in: 0 ... 20), y: self.position.y + .random(in: 0 ... 20)))
                }
            }
        }
        .onAppear {
            Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { _ in
                if self.hearts.count <= 10 {
                    withAnimation {
                        self.hearts.append(.init())
                    }
                }
            }
        }
    }
}
`
        },
        {
          "isFile": true,
          "isOpen": false,
          "language": "swift",
          "name": "ContentViewModel.swift",
          "path": "/SimutaneousCursors/ContentViewModel.swift",
          "content": `

import Combine
import Foundation
import SwiftUI
import Yorkie

@Observable
class ContentViewModel {
    @ObservationIgnored var currentTimer: Timer?
    let width = UIScreen.current!.bounds.size.width
    let height = UIScreen.current!.bounds.size.height

    @ObservationIgnored private var client: Client
    @ObservationIgnored private let document: Document
    @ObservationIgnored var presenecs = [Presence]()
    var paths: [String: [CGPoint]] = [:]
    var drawingNames: [String] = []

    var uiPresenecs = [Model]()
    var currentCursor: CursorShape = .heart {
        didSet {
            self.updateCursor()
        }
    }

    private(set) var state = ContentState.loading

    init() {
        self.client = Client(Constant.serverAddress)
        self.document = Document(key: Constant.documentKey)
    }

    func initializeClient(with name: String) async {
        self.state = .loading
        do {
            try await self.client.activate()

            let doc = try await client.attach(self.document, [
                "name": name,
                "cursorShape": "heart",
                "cursor": ["xPos": 0.5, "yPos": 0.5],
                "pointerDown": false
            ])
            try self.document.update { root, _ in
                var text = root.content as? JSONText
                if text == nil {
                    root.content = JSONText()
                    text = root.content as? JSONText
                }
            }
            let pres = doc.getPresences()
            self.mapFromPrecenscToUI(pres)
            self.state = .success

            await self.watch()
        } catch {
            self.state = .error(.cannotInitClient("\\(error.localizedDescription)"))
        }
    }

    func deactivate() async {
        do {
            try await self.client.deactivate()
        } catch {}
    }

    func watch() async {
        self.document.subscribe { [weak self] event, document in
            if case .syncStatusChanged = event.type {
                let presences = document.getPresences()
                self?.mapFromPrecenscToUI(presences)
            } else if case .presenceChanged = event.type {
                let presences = document.getPresences()
                self?.mapFromPrecenscToUI(presences)
            }
        }
    }

    @MainActor
    private func mapFromPrecenscToUI(_ peers: [PeerElement]) {
        var _uiPresenecs = [Model]()

        for peer in peers {
            let id = peer.clientID
            let presentModel = peer.presence
            let name = presentModel["name"] as? String ?? "anonymous"
            let pointerDown = presentModel["pointerDown"] as? Bool
            let cursor = presentModel["cursor"] as? [String: Double]
            let cursorShape = presentModel["cursorShape"] as? String

            guard let pointerDown, let cursor, let cursorShape, let cursorShape = CursorShape(rawValue: cursorShape) else {
                continue
            }

            guard let xPos = cursor["xPos"], let yPos = cursor["yPos"] else { fatalError() }
            let realxPos = xPos * self.width
            let realyPos = yPos * self.height

            let model = Model(
                clientID: id,
                presence: .init(
                    name: name,
                    pointerDown: pointerDown,
                    cursorShape: cursorShape,
                    cursor: .init(xPos: realxPos, yPos: realyPos)
                )
            )

            if cursorShape == .pen, pointerDown {
                self.drawingNames.append(name)
                self.paths[name]?.append(.init(x: realxPos, y: realyPos))
            } else {
                self.drawingNames.removeAll(where: { $0 == name })
                self.paths[name] = []
            }

            _uiPresenecs.append(model)
        }

        self.uiPresenecs.removeAll()
        self.uiPresenecs = _uiPresenecs
    }

    func updatePosition(_ position: CGPoint, isTouchDown: Bool) {
        do {
            try self.document.update { _, presence in
                presence.set([
                    "cursor": ["xPos": position.x / self.width, "yPos": position.y / self.height],
                    "pointerDown": isTouchDown
                ])
            }
        } catch {
            self.state = .error(.cannotInitClient("\\(error.localizedDescription)"))
        }
    }

    func updateCursor() {
        do {
            try self.document.update { _, presence in
                presence.set(["cursorShape": self.currentCursor])
            }
        } catch {
            self.state = .error(.cannotInitClient("\\(error.localizedDescription)"))
        }
    }
}
`
        },
        {
          "isFile": true,
          "isOpen": false,
          "language": "swift",
          "name": "PresenceModel.swift",
          "path": "/SimutaneousCursors/PresenceModel.swift",
          "content": `
import Foundation

struct Cursor: Codable {
    let xPos: Double
    let yPos: Double
}

struct PresenceModel: Codable {
    let name: String
    let pointerDown: Bool
    let cursorShape: CursorShape
    let cursor: Cursor
}

enum CursorShape: String, Codable {
    case heart
    case thumbs
    case pen
    case cursor

    var systemImageName: String {
        switch self {
        case .heart: return "heart.fill"
        case .thumbs: return "hand.thumbsup.fill"
        case .pen: return "paintbrush.pointed.fill"
        case .cursor: return "cursorarrow"
        }
    }

    var color: ColorModel {
        switch self {
        case .heart:
            return .init(r: 1, g: 0, b: 0, a: 1)
        case .thumbs:
            return .init(r: 1, g: 1, b: 0, a: 1)
        case .pen:
            return .init(r: 0, g: 0, b: 0, a: 1)
        case .cursor:
            return .init(r: 0, g: 0, b: 0, a: 0)
        }
    }
}

struct Model: Codable, Identifiable {
    var id: String { self.clientID }

    let clientID: String
    let presence: PresenceModel
}

struct ColorModel {
    let r, g, b, a: CGFloat
}
`
        }
      ]
    }
  ]
};
