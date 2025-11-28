import { DirectoryInfo } from '@/utils/exampleFileUtils';

export const FILE_INFO: DirectoryInfo = {
  "isFile": false,
  "name": "RichTextEditor",
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
import UIKit

struct ContentView: View {
    @Environment(\\.dismiss) var dismiss
    @StateObject var viewModel = ContentViewModel()
    @State private var showSettings = false
    @State private var documentKey = ""

    var appVersion: String {
        var version = ""
        if let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String {
            version.append(appVersion)
        }
        if let buildNumber = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String {
            version.append(" build ")
            version.append(buildNumber)
        }
        return version
    }

    var body: some View {
        VStack(spacing: 0) {
            // Header with peers and version
            HStack(alignment: .top) {
                Text("Participants: [\\(self.viewModel.localUsername), \\(self.viewModel.peers.filter { $0.name != self.viewModel.localUsername }.map { $0.name }.joined(separator: ", "))]")
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.leading)
                    .frame(maxWidth: .infinity, alignment: .leading)

                Text("v\\(self.appVersion)")
                    .font(.system(size: 11))
            }
            .padding(.horizontal, 16)
            .padding(.top, 8)

            // Toolbar
            HStack(spacing: 12) {
                // Bold button
                Button(action: {
                    if let selection = self.viewModel.selection, selection.length > 0 {
                        self.viewModel.custom(range: selection, font: .bold, value: !self.viewModel.isBold)
                    } else {
                        self.viewModel.toggleFormat(.bold)
                    }
                }) {
                    Text("B")
                        .font(.system(size: 18, weight: .bold))
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(self.viewModel.isBold ? Color.blue.opacity(0.2) : Color(UIColor.systemBackground))
                        .foregroundColor(.primary)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(UIColor.systemGray4), lineWidth: 1)
                        )
                }

                // Italic button
                Button(action: {
                    if let selection = self.viewModel.selection, selection.length > 0 {
                        self.viewModel.custom(range: selection, font: .italic, value: !self.viewModel.isItalic)
                    } else {
                        self.viewModel.toggleFormat(.italic)
                    }
                }) {
                    Text("I")
                        .font(.system(size: 18).italic())
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(self.viewModel.isItalic ? Color.blue.opacity(0.2) : Color(UIColor.systemBackground))
                        .foregroundColor(.primary)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(UIColor.systemGray4), lineWidth: 1)
                        )
                }

                // Underline button
                Button(action: {
                    if let selection = self.viewModel.selection, selection.length > 0 {
                        self.viewModel.custom(range: selection, font: .underline, value: !self.viewModel.isUnderline)
                    } else {
                        self.viewModel.toggleFormat(.underline)
                    }
                }) {
                    Text("U")
                        .font(.system(size: 18))
                        .underline()
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(self.viewModel.isUnderline ? Color.blue.opacity(0.2) : Color(UIColor.systemBackground))
                        .foregroundColor(.primary)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(UIColor.systemGray4), lineWidth: 1)
                        )
                }

                // Strikethrough button
                Button(action: {
                    if let selection = self.viewModel.selection, selection.length > 0 {
                        self.viewModel.custom(range: selection, font: .strike, value: !self.viewModel.isStrikethrough)
                    } else {
                        self.viewModel.toggleFormat(.strike)
                    }
                }) {
                    Text("S")
                        .font(.system(size: 18))
                        .strikethrough()
                        .frame(maxWidth: .infinity)
                        .frame(height: 44)
                        .background(self.viewModel.isStrikethrough ? Color.blue.opacity(0.2) : Color(UIColor.systemBackground))
                        .foregroundColor(.primary)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(UIColor.systemGray4), lineWidth: 1)
                        )
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 8)
            .frame(height: 60)
            .background(Color(UIColor.systemGray6))

            RTUITextField(text: self.viewModel.attributeString, textField: self.viewModel.uitextView, lastEditStyle: self.viewModel.lastEditStyle, didChangeSelection: { fromIndex, toIndex in
                self.viewModel.selection = NSRange(location: fromIndex, length: toIndex - fromIndex)
            }, didChangeText: { range, value in
                let pendingFormats = self.viewModel.getPendingFormats()
                self.viewModel.updateText(ranges: range, value: value, fonts: pendingFormats)
            })
            .padding(16)
        }
        .navigationBarBackButtonHidden(true)
        .toolbar(content: {
            ToolbarItem(placement: .navigationBarLeading) {
                Button("Back") {
                    self.viewModel.dismiss()
                    self.dismiss.callAsFunction()
                }
            }
        })
        .navigationTitle("Rich Text Editor")
        .navigationBarTitleDisplayMode(.inline)
        .task {
            await self.viewModel.initializeClient()
        }
        .sheet(isPresented: self.$showSettings) {
            NavigationView {
                VStack(spacing: 20) {
                    Text("Document Settings")
                        .font(.headline)
                        .padding(.top)

                    Text("Enter a document key to connect to a different collaborative session")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)

                    TextField("Document Key", text: self.$documentKey)
                        .textFieldStyle(.roundedBorder)
                        .autocapitalization(.none)
                        .autocorrectionDisabled()
                        .padding(.horizontal)

                    Spacer()
                }
                .navigationBarItems(
                    leading: Button("Cancel") {
                        self.showSettings = false
                    },
                    trailing: Button("Done") {
                        self.showSettings = false
                        self.viewModel.updateKeys(self.documentKey)
                    }
                )
            }
        }
    }
}

#Preview {
    NavigationView {
        ContentView()
    }
}`
    },
    {
      "isFile": true,
      "isOpen": false,
      "language": "swift",
      "name": "ContentViewModel.swift",
      "path": "/ContentViewModel.swift",
      "content": `

import Combine
import UIKit
import Yorkie

@MainActor
class ContentViewModel: ObservableObject {
    var appVersion: String {
        var version = ""
        if let appVersion = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String {
            version.append(appVersion)
        }

        if let buildNumber = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String {
            version.append(" build ")
            version.append(buildNumber)
        }
        return version
    }

    let uitextView = UITextView()

    private var client: Client
    private var document: Document
    var selection: NSRange? {
        didSet {
            self.updateMySelection()
            Task { @MainActor in
                self.updateFormattingStates()
            }
        }
    }

    private var content: String = ""
    @Published var attributeString = NSMutableAttributedString(string: "")
    @Published var lastEditStyle: EditStyle?
    @Published var isBold: Bool = false
    @Published var isItalic: Bool = false
    @Published var isUnderline: Bool = false
    @Published var isStrikethrough: Bool = false

    var mutableAttributeString: NSMutableAttributedString {
        self.attributeString.mutableCopy() as! NSMutableAttributedString
    }

    @MainActor
    func updateAttribute(_ attribute: NSMutableAttributedString, _ function: String = #function) {
        Log.log("[Attribute change] function: \\(function) -> \\(attribute)", level: .debug)
        self.attributeString = attribute
    }

    var documentKey = Constant.documentKey
    private let apiKey = Constant.apiKey
    @Published var peers = [Peer]()

    // Generate unique username for this device
    lazy var localUsername: String = {
        let deviceName = UIDevice.current.name
        let identifier = UUID().uuidString.prefix(8)
        return "\\(deviceName)-\\(identifier)"
    }()

    // Generate a random color for this device
    private lazy var localUserColor: String = {
        let colors: [String] = [
            "#a83267", "#2196F3", "#4CAF50", "#FF9800",
            "#9C27B0", "#00BCD4", "#FFEB3B", "#E91E63"
        ]
        return colors.randomElement() ?? "#a83267"
    }()

    var didFinishSync = false
    init() {
        self.client = Client(
            "https://yorkie-api-qa.navercorp.com",
            .init(apiKey: self.apiKey)
        )
        // use for local server
        // self.client = Client(Constant.serverAddress)

        self.document = Document(key: self.documentKey)
        Log.log("Document key: \\(self.documentKey)", level: .info)
        Log.log("API key: \\(self.apiKey)", level: .info)
    }
}

// MARK: - Yorkie handler

extension ContentViewModel {
    func updateKeys(_ key: String) {
        // let key = Constant.yesterDaydocumentKey
        guard self.documentKey != key else { return }
        self.documentKey = key

        Task {
            try await self.client.detach(self.document)
            self.document = Document(key: self.documentKey)
            await self.initializeClient()
        }
    }

    func toggleFormat(_ format: CustomFont) {
        switch format {
        case .bold:
            self.isBold.toggle()
        case .italic:
            self.isItalic.toggle()
        case .underline:
            self.isUnderline.toggle()
        case .strike:
            self.isStrikethrough.toggle()
        }
        Log.log("toggleFormat \\(format): bold=\\(self.isBold), italic=\\(self.isItalic), underline=\\(self.isUnderline), strike=\\(self.isStrikethrough)", level: .debug)
    }

    func dismiss() {
        Task {
            do {
                try await self.client.detach(self.document)
                try await self.client.deactivate()
            } catch {
                fatalError()
            }
        }
    }

    func getPendingFormats() -> [CustomFont] {
        var formats: [CustomFont] = []
        if self.isBold { formats.append(.bold) }
        if self.isItalic { formats.append(.italic) }
        if self.isUnderline { formats.append(.underline) }
        if self.isStrikethrough { formats.append(.strike) }
        return formats
    }

    func initializeClient() async {
        Log.log("initializeClient", level: .debug)
        do {
            try await self.client.activate()

            try await self.client.attach(self.document, [
                "username": self.localUsername,
                "color": self.localUserColor
            ])

            try self.document.update { root, _ in
                var text = root.content as? JSONText
                if text == nil {
                    root.content = JSONText()
                    text = root.content as? JSONText
                }
            }
            self.syncTextSnapShot()

            await self.watch()
        } catch {
            Log.log("initializeClient Error: \\(error.localizedDescription)", level: .error)
        }
    }

    func updateText(ranges: [NSValue], value: String, fonts: [CustomFont]) {
        Log.log("updateText: ranges: \\(ranges), value: \\(value), fonts: \\(fonts.sorted(by: { $0.rawValue > $1.rawValue }).map { $0.rawValue }.joined(separator: ", "))", level: .info)
        try? self.document.update { [weak self] root, _ in
            guard let self, let content = root.content as? JSONText else {
                Log.log("content not found: \\(String(describing: root.content))", level: .warning)
                return
            }
            guard let ranges = ranges as? [NSRange], let range = ranges.first else {
                Log.log("range not found: \\(ranges)", level: .warning)
                return
            }
            let toIdx = range.location + range.length
            Log.log("updateText edit range: \\(range.location) -> \\(toIdx)", level: .debug)
            content.edit(range.location, toIdx, value, fonts.attributes)
            if value.isEmpty {
                // delete
                let att = self.mutableAttributeString
                guard att.string.count >= range.length + range.location else { return }
                att.deleteCharacters(in: range)
                self.updateAttribute(att)
            } else {
                // insert character
                let att = self.mutableAttributeString

                // Ensure insertion point is within valid bounds
                let safeLocation = min(range.location, att.length)

                let newAttribute = NSMutableAttributedString(string: value)
                let isBold = fonts.contains(.bold)
                let isItalic = fonts.contains(.italic)
                let isUnderline = fonts.contains(.underline)
                let isStrike = fonts.contains(.strike)

                var font: UIFont = .defaulf
                if isBold && isItalic {
                    font = font.boldItalicSelf()
                } else if isBold {
                    font = font.boldSelf()
                } else if isItalic {
                    font = font.italicSelf()
                }

                newAttribute.addAttribute(.font, value: font, range: NSRange(location: 0, length: value.count))

                if isUnderline {
                    newAttribute.addAttribute(.underlineStyle, value: NSUnderlineStyle.single.rawValue, range: NSRange(location: 0, length: value.count))
                }

                if isStrike {
                    newAttribute.addAttribute(.strikethroughStyle, value: NSUnderlineStyle.single.rawValue, range: NSRange(location: 0, length: value.count))
                }

                att.insert(newAttribute, at: safeLocation)
                self.updateAttribute(att)
            }
        }
    }

    func custom(range: NSRange, font: CustomFont, value: Bool) {
        Log.log("custom range: [\\(range.location):\\(range.length)] -> \\(font), value: \\(value)", level: .debug)
        try? self.document.update { root, _ in
            guard let content = root.content as? JSONText else { return }

            let toIdx = range.location + range.length
            Log.log("custom range set style: [\\(range.location):\\(toIdx)] -> \\(font), value: \\(value)", level: .debug)
            content.setStyle(range.location, toIdx, [font.rawValue: value])
        }
    }

    func watch() async {
        self.document.subscribe { [weak self] event, _ in
            Log.log("did receive event \\(event.type)", level: .debug)
            if let event = event as? RemoteChangeEvent {
                // adding text from FE and sync to iOS
                // receive when peer changes text
                let events = self?.decodeEvent(event)
                self?.applyEvents(events)
            } else if let event = event as? LocalChangeEvent {
                // changing text on iOS and sync to others
                let events = self?.decodeEvent(event)
                self?.applyEvents(events)
            } else if let event = event as? PresenceChangedEvent {
                // notify the view to trigger view to update
                let peers = self?.document.getPresences(false)

                if let name = event.value.presence["username"] as? String, let color = event.value.presence["color"] as? String, name != self?.localUsername {
                    self?.drawPeer(for: event.value.actorID, name: name, color: color)
                } else {
                    Log.log("Can not get this peer name :\\(event.value.presence)", level: .error)
                }
            } else if let event = event as? WatchedEvent {
                self?.decodeEvent(event.value)
            }
        }
    }

    func updateMySelection() {
        try? self.document.updatePresence { presence, _ in
            guard let selection else {
                Log.log("No selection to update", level: .warning)
                return
            }

            guard let content = self.document.getRoot().content as? JSONText else { return }

            let fromIdx = selection.location
            let toIdx = selection.location + selection.length

            if let pos = try? content.indexRangeToPosRange((fromIdx, toIdx)) {
                presence.set([
                    "selection": [
                        "from": pos.0,
                        "to": pos.1
                    ]
                ])
                Log.log("updateMySelection from: [\\(fromIdx):\\(toIdx)] -> [\\(pos.0):\\(pos.1)]", level: .debug)
            } else {
                Log.log("Failed to convert range [\\(fromIdx):\\(toIdx)] to position range", level: .warning)
            }
        }
    }

    func drawPeer(for actorId: ActorID, name: String, color: String) {
        // Draw peer selection indicators
        if let peers = self.document.getPresences() {
            for peer in peers {
                let presence = peer.presence
                guard let selection = presence["selection"] as? [String: RGATreeSplitNodePos] else { continue }

                let fromPos = selection["from"]
                let toPos = selection["to"]

                if let (fromIdx, toIdx) = try? (self.document.getRoot().content as? JSONText)?.posRangeToIndexRange((fromPos!, toPos!)) {
                    let range = NSRange(location: fromIdx, length: toIdx - fromIdx)
                    var peers = self.peers
                    let previous = peers.first(where: { $0.name == name })

                    peers.removeAll(where: { $0.name == name })
                    let nextPeer = Peer(clientID: peer.clientID, name: name, position: range, color: color)
                    peers.append(nextPeer)
                    self.updatePeerSelection(with: previous, peer: nextPeer)
                    self.update(peers: peers)
                }
            }
        }
    }

    func updatePeerSelection(with previous: Peer?, peer: Peer) {
        let index = peer.position.location
        guard index <= uitextView.text.count else { return }

        if let position = uitextView.position(from: uitextView.beginningOfDocument, offset: index) {
            let caretRect = uitextView.caretRect(for: position)
            let color = UIColor(hex: peer.color)

            let cursor = CustomCursorView(
                frame: CGRect(x: caretRect.origin.x, y: caretRect.origin.y, width: 2, height: caretRect.height),
                color: color ?? .red
            )
            cursor.accessibilityLabel = peer.name

            uitextView.subviews.filter { $0.accessibilityLabel == peer.clientID }.forEach { $0.removeFromSuperview() }
            uitextView.addSubview(cursor)

            let contentView = UILabel()
            contentView.text = peer.name
            contentView.font = UIFont.systemFont(ofSize: 14)
            contentView.textColor = color
            contentView.sizeToFit()

            cursor.addSubview(contentView)
        }
    }

    func update(peers: [Peer]) {
        self.peers = peers
    }

    @MainActor
    func updateFormattingStates() {
        guard let selection = self.selection else {
            return
        }

        if self.attributeString.length == 0 {
            return
        }

        let checkRange: NSRange
        if selection.length > 0 {
            checkRange = selection
        } else {
            var position = selection.location
            if position >= self.attributeString.length {
                position = max(0, self.attributeString.length - 1)
            }
            checkRange = NSRange(location: position, length: 1)
        }

        if selection.length > 0 {
            self.isBold = self.hasFormattingInRange(checkRange, checkBold: true)
            self.isItalic = self.hasFormattingInRange(checkRange, checkItalic: true)
            self.isUnderline = self.hasFormattingInRange(checkRange, checkUnderline: true)
            self.isStrikethrough = self.hasFormattingInRange(checkRange, checkStrikethrough: true)
        }
    }

    private func hasFormattingInRange(_ range: NSRange, checkBold: Bool = false, checkItalic: Bool = false, checkUnderline: Bool = false, checkStrikethrough: Bool = false) -> Bool {
        guard range.location + range.length <= self.attributeString.length else { return false }

        var hasFormatting = true
        self.attributeString.enumerateAttributes(in: range, options: []) { attributes, _, stop in
            if checkBold || checkItalic {
                if let font = attributes[.font] as? UIFont {
                    if checkBold && !font.fontDescriptor.symbolicTraits.contains(.traitBold) {
                        hasFormatting = false
                        stop.pointee = true
                    }
                    if checkItalic && !font.fontDescriptor.symbolicTraits.contains(.traitItalic) {
                        hasFormatting = false
                        stop.pointee = true
                    }
                } else {
                    hasFormatting = false
                    stop.pointee = true
                }
            }

            if checkUnderline {
                if let underlineStyle = attributes[.underlineStyle] as? Int, underlineStyle != 0 {
                    // Has underline
                } else {
                    hasFormatting = false
                    stop.pointee = true
                }
            }

            if checkStrikethrough {
                if let strikethroughStyle = attributes[.strikethroughStyle] as? Int, strikethroughStyle != 0 {
                    // Has strikethrough
                } else {
                    hasFormatting = false
                    stop.pointee = true
                }
            }
        }
        return hasFormatting
    }
}`
    },
    {
      "isFile": true,
      "isOpen": false,
      "language": "swift",
      "name": "RTUITextField.swift",
      "path": "/RTUITextField.swift",
      "content": `

import SwiftUI
import UIKit

struct RTUITextField: UIViewRepresentable {
    var lastEditStyle: EditStyle?
    var text: NSMutableAttributedString
    let textField: UITextView
    var didChangeSelection: (Int, Int) -> Void
    var didChangeText: ([NSValue], String) -> Void

    init(
        text: NSMutableAttributedString,
        textField: UITextView,
        lastEditStyle: EditStyle?,
        didChangeSelection: @escaping (Int, Int) -> Void,
        didChangeText: @escaping ([NSValue], String) -> Void
    ) {
        self.text = text
        self.textField = textField
        self.lastEditStyle = lastEditStyle
        self.didChangeSelection = didChangeSelection
        self.didChangeText = didChangeText
    }

    func makeUIView(context: Context) -> UITextView {
        textField.delegate = context.coordinator
        textField.font = UIFont.systemFont(ofSize: Constant.TextInfo.fontSize)
        textField.backgroundColor = UIColor.systemBackground
        textField.layer.borderColor = UIColor.systemGray4.cgColor
        textField.layer.borderWidth = 1
        textField.layer.cornerRadius = 8
        textField.textContainerInset = UIEdgeInsets(top: 12, left: 8, bottom: 12, right: 8)
        
        return textField
    }

    func updateUIView(_ uiView: UITextView, context: Context) {
        if uiView.attributedText != text {
            uiView.attributedText = text
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    class Coordinator: NSObject, UITextViewDelegate {
        var parent: RTUITextField

        init(_ parent: RTUITextField) {
            self.parent = parent
        }

        func textViewDidChangeSelection(_ textView: UITextView) {
            let range = textView.selectedRange
            parent.didChangeSelection(range.location, range.location + range.length)
        }

        func textViewDidChange(_ textView: UITextView) {
            // Handle text changes
        }

        func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
            let ranges = [NSValue(range: range)]
            parent.didChangeText(ranges, text)
            return false // We handle the text change ourselves
        }
    }
}`
    }
  ]
};
