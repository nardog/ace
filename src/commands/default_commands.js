"use strict";

var lang = require("../lib/lang");
var config = require("../config");
var nls = config.nls;
var Range = require("../range").Range;

function bindKey(win, mac) {
    return {win: win, mac: mac};
}

/*
    multiSelectAction: "forEach"|"forEachLine"|function|undefined,
    scrollIntoView: true|"cursor"|"center"|"selectionPart"
*/
/**@type {import("../../ace-internal").Ace.Command[]} */
exports.commands = [{
    name: "showSettingsMenu",
    description: nls("commands.show-settings-menu", "Show settings menu"),
    bindKey: bindKey("Ctrl-,", "Command-,"),
    exec: function(editor) {
        config.loadModule("ace/ext/settings_menu", function(module) {
            module.init(editor);
            editor.showSettingsMenu();
        });
    },
    readOnly: true
}, {
    name: "goToNextError",
    description: nls("commands.go-to-next-error", "Go to next error"),
    bindKey: bindKey("Alt-E", "F4"),
    exec: function(editor) {
        config.loadModule("ace/ext/error_marker", function(module) {
            module.showErrorMarker(editor, 1);
        });
    },
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "goToPreviousError",
    description: nls("commands.go-to-previous-error", "Go to previous error"),
    bindKey: bindKey("Alt-Shift-E", "Shift-F4"),
    exec: function(editor) {
        config.loadModule("ace/ext/error_marker", function(module) {
            module.showErrorMarker(editor, -1);
        });
    },
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "selectall",
    description: nls("commands.selectall", "Select all"),
    bindKey: bindKey("Ctrl-A", "Command-A"),
    exec: function(editor) { editor.selectAll(); },
    readOnly: true
}, {
    name: "centerselection",
    description: nls("commands.centerselection", "Center selection"),
    bindKey: bindKey(null, "Ctrl-L"),
    exec: function(editor) { editor.centerSelection(); },
    readOnly: true
}, {
    name: "gotoline",
    description: nls("commands.gotoline", "Go to line..."),
    bindKey: bindKey("Ctrl-L", "Command-L"),
    exec: function(editor, line) {
        // backwards compatibility
        if (typeof line === "number" && !isNaN(line))
            editor.gotoLine(line);
        editor.prompt({ $type: "gotoLine" });
    },
    readOnly: true
}, {
    name: "fold",
    bindKey: bindKey("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
    exec: function(editor) { editor.session.toggleFold(false); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "unfold",
    bindKey: bindKey("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
    exec: function(editor) { editor.session.toggleFold(true); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "toggleFoldWidget",
    description: nls("commands.toggle-fold-widget", "Toggle fold widget"),
    bindKey: bindKey("F2", "F2"),
    exec: function(editor) { editor.session.toggleFoldWidget(); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "toggleParentFoldWidget",
    description: nls("commands.toggle-parent-fold-widget", "Toggle parent fold widget"),
    bindKey: bindKey("Alt-F2", "Alt-F2"),
    exec: function(editor) { editor.session.toggleFoldWidget(true); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "foldall",
    description: nls("commands.foldall", "Fold all"),
    bindKey: bindKey(null, "Ctrl-Command-Option-0"),
    exec: function(editor) { editor.session.foldAll(); },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "foldAllComments",
    description: nls("commands.fold-all-comments", "Fold all comments"),
    bindKey: bindKey(null, "Ctrl-Command-Option-0"),
    exec: function(editor) { editor.session.foldAllComments(); },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "foldOther",
    description: nls("commands.fold-other", "Fold other"),
    bindKey: bindKey("Alt-0", "Command-Option-0"),
    exec: function(editor) { 
        editor.session.foldAll();
        editor.session.unfold(editor.selection.getAllRanges());
    },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "unfoldall",
    description: nls("commands.unfoldall", "Unfold all"),
    bindKey: bindKey("Alt-Shift-0", "Command-Option-Shift-0"),
    exec: function(editor) { editor.session.unfold(); },
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "findnext",
    description: nls("commands.findnext", "Find next"),
    bindKey: bindKey("Ctrl-K", "Command-G"),
    exec: function(editor) { editor.findNext(); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "findprevious",
    description: nls("commands.findprevious", "Find previous"),
    bindKey: bindKey("Ctrl-Shift-K", "Command-Shift-G"),
    exec: function(editor) { editor.findPrevious(); },
    multiSelectAction: "forEach",
    scrollIntoView: "center",
    readOnly: true
}, {
    name: "selectOrFindNext",
    description: nls("commands.select-or-find-next", "Select or find next"),
    bindKey: bindKey("Alt-K", "Ctrl-G"),
    exec: function(editor) {
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        else
            editor.findNext(); 
    },
    readOnly: true
}, {
    name: "selectOrFindPrevious",
    description: nls("commands.select-or-find-previous", "Select or find previous"),
    bindKey: bindKey("Alt-Shift-K", "Ctrl-Shift-G"),
    exec: function(editor) { 
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        else
            editor.findPrevious();
    },
    readOnly: true
}, {
    name: "find",
    description: nls("commands.find", "Find"),
    bindKey: bindKey("Ctrl-F", "Command-F"),
    exec: function(editor) {
        config.loadModule("ace/ext/searchbox", function(e) {e.Search(editor);});
    },
    readOnly: true
}, {
    name: "overwrite",
    description: nls("commands.overwrite", "Overwrite"),
    bindKey: "Insert",
    exec: function(editor) { editor.toggleOverwrite(); },
    readOnly: true
}, {
    name: "selecttostart",
    description: nls("commands.selecttostart", "Select to start"),
    bindKey: bindKey("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"),
    exec: function(editor) { editor.getSelection().selectFileStart(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "gotostart",
    description: nls("commands.gotostart", "Go to start"),
    bindKey: bindKey("Ctrl-Home", "Command-Home|Command-Up"),
    exec: function(editor) { editor.navigateFileStart(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "selectup",
    description: nls("commands.selectup", "Select up"),
    bindKey: bindKey("Shift-Up", "Shift-Up|Ctrl-Shift-P"),
    exec: function(editor) { editor.getSelection().selectUp(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "golineup",
    description: nls("commands.golineup", "Go line up"),
    bindKey: bindKey("Up", "Up|Ctrl-P"),
    exec: function(editor, args) { editor.navigateUp(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selecttoend",
    description: nls("commands.selecttoend", "Select to end"),
    bindKey: bindKey("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"),
    exec: function(editor) { editor.getSelection().selectFileEnd(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "gotoend",
    description: nls("commands.gotoend", "Go to end"),
    bindKey: bindKey("Ctrl-End", "Command-End|Command-Down"),
    exec: function(editor) { editor.navigateFileEnd(); },
    multiSelectAction: "forEach",
    readOnly: true,
    scrollIntoView: "animate",
    aceCommandGroup: "fileJump"
}, {
    name: "selectdown",
    description: nls("commands.selectdown", "Select down"),
    bindKey: bindKey("Shift-Down", "Shift-Down|Ctrl-Shift-N"),
    exec: function(editor) { editor.getSelection().selectDown(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "golinedown",
    description: nls("commands.golinedown", "Go line down"),
    bindKey: bindKey("Down", "Down|Ctrl-N"),
    exec: function(editor, args) { editor.navigateDown(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectwordleft",
    description: nls("commands.selectwordleft", "Select word left"),
    bindKey: bindKey("Ctrl-Shift-Left", "Option-Shift-Left"),
    exec: function(editor) { editor.getSelection().selectWordLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotowordleft",
    description: nls("commands.gotowordleft", "Go to word left"),
    bindKey: bindKey("Ctrl-Left", "Option-Left"),
    exec: function(editor) { editor.navigateWordLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selecttolinestart",
    description: nls("commands.selecttolinestart", "Select to line start"),
    bindKey: bindKey("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"),
    exec: function(editor) { editor.getSelection().selectLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotolinestart",
    description: nls("commands.gotolinestart", "Go to line start"),
    bindKey: bindKey("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
    exec: function(editor) { editor.navigateLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectleft",
    description: nls("commands.selectleft", "Select left"),
    bindKey: bindKey("Shift-Left", "Shift-Left|Ctrl-Shift-B"),
    exec: function(editor) { editor.getSelection().selectLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotoleft",
    description: nls("commands.gotoleft", "Go to left"),
    bindKey: bindKey("Left", "Left|Ctrl-B"),
    exec: function(editor, args) { editor.navigateLeft(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectwordright",
    description: nls("commands.selectwordright", "Select word right"),
    bindKey: bindKey("Ctrl-Shift-Right", "Option-Shift-Right"),
    exec: function(editor) { editor.getSelection().selectWordRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotowordright",
    description: nls("commands.gotowordright", "Go to word right"),
    bindKey: bindKey("Ctrl-Right", "Option-Right"),
    exec: function(editor) { editor.navigateWordRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selecttolineend",
    description: nls("commands.selecttolineend", "Select to line end"),
    bindKey: bindKey("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"),
    exec: function(editor) { editor.getSelection().selectLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotolineend",
    description: nls("commands.gotolineend", "Go to line end"),
    bindKey: bindKey("Alt-Right|End", "Command-Right|End|Ctrl-E"),
    exec: function(editor) { editor.navigateLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectright",
    description: nls("commands.selectright", "Select right"),
    bindKey: bindKey("Shift-Right", "Shift-Right"),
    exec: function(editor) { editor.getSelection().selectRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "gotoright",
    description: nls("commands.gotoright", "Go to right"),
    bindKey: bindKey("Right", "Right|Ctrl-F"),
    exec: function(editor, args) { editor.navigateRight(args.times); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectpagedown",
    description: nls("commands.selectpagedown", "Select page down"),
    bindKey: "Shift-PageDown",
    exec: function(editor) { editor.selectPageDown(); },
    readOnly: true
}, {
    name: "pagedown",
    description: nls("commands.pagedown", "Page down"),
    bindKey: bindKey(null, "Option-PageDown"),
    exec: function(editor) { editor.scrollPageDown(); },
    readOnly: true
}, {
    name: "gotopagedown",
    description: nls("commands.gotopagedown", "Go to page down"),
    bindKey: bindKey("PageDown", "PageDown|Ctrl-V"),
    exec: function(editor) { editor.gotoPageDown(); },
    readOnly: true
}, {
    name: "selectpageup",
    description: nls("commands.selectpageup", "Select page up"),
    bindKey: "Shift-PageUp",
    exec: function(editor) { editor.selectPageUp(); },
    readOnly: true
}, {
    name: "pageup",
    description: nls("commands.pageup", "Page up"),
    bindKey: bindKey(null, "Option-PageUp"),
    exec: function(editor) { editor.scrollPageUp(); },
    readOnly: true
}, {
    name: "gotopageup",
    description: nls("commands.gotopageup", "Go to page up"),
    bindKey: "PageUp",
    exec: function(editor) { editor.gotoPageUp(); },
    readOnly: true
}, {
    name: "scrollup",
    description: nls("commands.scrollup", "Scroll up"),
    bindKey: bindKey("Ctrl-Up", null),
    exec: function(e) { e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight); },
    readOnly: true
}, {
    name: "scrolldown",
    description: nls("commands.scrolldown", "Scroll down"),
    bindKey: bindKey("Ctrl-Down", null),
    exec: function(e) { e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight); },
    readOnly: true
}, {
    name: "selectlinestart",
    description: nls("commands.selectlinestart", "Select line start"),
    bindKey: "Shift-Home",
    exec: function(editor) { editor.getSelection().selectLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectlineend",
    description: nls("commands.selectlineend", "Select line end"),
    bindKey: "Shift-End",
    exec: function(editor) { editor.getSelection().selectLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "togglerecording",
    description: nls("commands.togglerecording", "Toggle recording"),
    bindKey: bindKey("Ctrl-Alt-E", "Command-Option-E"),
    exec: function(editor) { editor.commands.toggleRecording(editor); },
    readOnly: true
}, {
    name: "replaymacro",
    description: nls("commands.replaymacro", "Replay macro"),
    bindKey: bindKey("Ctrl-Shift-E", "Command-Shift-E"),
    exec: function(editor) { editor.commands.replay(editor); },
    readOnly: true
}, {
    name: "jumptomatching",
    description: nls("commands.jumptomatching", "Jump to matching"),
    bindKey: bindKey("Ctrl-\\|Ctrl-P", "Command-\\"),
    exec: function(editor) { editor.jumpToMatching(); },
    multiSelectAction: "forEach",
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "selecttomatching",
    description: nls("commands.selecttomatching", "Select to matching"),
    bindKey: bindKey("Ctrl-Shift-\\|Ctrl-Shift-P", "Command-Shift-\\"),
    exec: function(editor) { editor.jumpToMatching(true); },
    multiSelectAction: "forEach",
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "expandToMatching",
    description: nls("commands.expand-to-matching", "Expand to matching"),
    bindKey: bindKey("Ctrl-Shift-M", "Ctrl-Shift-M"),
    exec: function(editor) { editor.jumpToMatching(true, true); },
    multiSelectAction: "forEach",
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "passKeysToBrowser",
    description: nls("commands.pass-keys-to-browser", "Pass keys to browser"),
    bindKey: bindKey(null, null),
    exec: function() {},
    passEvent: true,
    readOnly: true
}, {
    name: "copy",
    description: nls("commands.copy", "Copy"),
    exec: function(editor) {
        // placeholder for replay macro
    },
    readOnly: true
},

// commands disabled in readOnly mode
{
    name: "cut",
    description: nls("commands.cut", "Cut"),
    exec: function(editor) {
        var cutLine = editor.$copyWithEmptySelection && editor.selection.isEmpty();
        var range = cutLine ? editor.selection.getLineRange() : editor.selection.getRange();
        editor._emit("cut", range);

        if (!range.isEmpty())
            editor.session.remove(range);
        editor.clearSelection();
    },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "paste",
    description: nls("commands.paste", "Paste"),
    exec: function(editor, args) {
        editor.$handlePaste(args);
    },
    scrollIntoView: "cursor"
}, {
    name: "removeline",
    description: nls("commands.removeline", "Remove line"),
    bindKey: bindKey("Ctrl-D", "Command-D"),
    exec: function(editor) { editor.removeLines(); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEachLine"
}, {
    name: "duplicateSelection",
    description: nls("commands.duplicate-selection", "Duplicate selection"),
    bindKey: bindKey("Ctrl-Shift-D", "Command-Shift-D"),
    exec: function(editor) { editor.duplicateSelection(); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "sortlines",
    description: nls("commands.sortlines", "Sort lines"),
    bindKey: bindKey("Ctrl-Alt-S", "Command-Alt-S"),
    exec: function(editor) { editor.sortLines(); },
    scrollIntoView: "selection",
    multiSelectAction: "forEachLine"
}, {
    name: "togglecomment",
    description: nls("commands.togglecomment", "Toggle comment"),
    bindKey: bindKey("Ctrl-/", "Command-/"),
    exec: function(editor) { editor.toggleCommentLines(); },
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
}, {
    name: "toggleBlockComment",
    description: nls("commands.toggle-block-comment", "Toggle block comment"),
    bindKey: bindKey("Ctrl-Shift-/", "Command-Shift-/"),
    exec: function(editor) { editor.toggleBlockComment(); },
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
}, {
    name: "modifyNumberUp",
    description: nls("commands.modify-number-up", "Modify number up"),
    bindKey: bindKey("Ctrl-Shift-Up", "Alt-Shift-Up"),
    exec: function(editor) { editor.modifyNumber(1); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "modifyNumberDown",
    description: nls("commands.modify-number-down", "Modify number down"),
    bindKey: bindKey("Ctrl-Shift-Down", "Alt-Shift-Down"),
    exec: function(editor) { editor.modifyNumber(-1); },
    scrollIntoView: "cursor",
    multiSelectAction: "forEach"
}, {
    name: "replace",
    description: nls("commands.replace", "Replace"),
    bindKey: bindKey("Ctrl-H", "Command-Option-F"),
    exec: function(editor) {
        config.loadModule("ace/ext/searchbox", function(e) {e.Search(editor, true);});
    }
}, {
    name: "undo",
    description: nls("commands.undo", "Undo"),
    bindKey: bindKey("Ctrl-Z", "Command-Z"),
    exec: function(editor) { editor.undo(); }
}, {
    name: "redo",
    description: nls("commands.redo", "Redo"),
    bindKey: bindKey("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
    exec: function(editor) { editor.redo(); }
}, {
    name: "copylinesup",
    description: nls("commands.copylinesup", "Copy lines up"),
    bindKey: bindKey("Alt-Shift-Up", "Command-Option-Up"),
    exec: function(editor) { editor.copyLinesUp(); },
    scrollIntoView: "cursor"
}, {
    name: "movelinesup",
    description: nls("commands.movelinesup", "Move lines up"),
    bindKey: bindKey("Alt-Up", "Option-Up"),
    exec: function(editor) { editor.moveLinesUp(); },
    scrollIntoView: "cursor"
}, {
    name: "copylinesdown",
    description: nls("commands.copylinesdown", "Copy lines down"),
    bindKey: bindKey("Alt-Shift-Down", "Command-Option-Down"),
    exec: function(editor) { editor.copyLinesDown(); },
    scrollIntoView: "cursor"
}, {
    name: "movelinesdown",
    description: nls("commands.movelinesdown", "Move lines down"),
    bindKey: bindKey("Alt-Down", "Option-Down"),
    exec: function(editor) { editor.moveLinesDown(); },
    scrollIntoView: "cursor"
}, {
    name: "del",
    description: nls("commands.del", "Delete"),
    bindKey: bindKey("Delete", "Delete|Ctrl-D|Shift-Delete"),
    exec: function(editor) { editor.remove("right"); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "backspace",
    description: nls("commands.backspace", "Backspace"),
    bindKey: bindKey(
        "Shift-Backspace|Backspace",
        "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"
    ),
    exec: function(editor) { editor.remove("left"); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "cut_or_delete",
    description: nls("commands.cut_or_delete", "Cut or delete"),
    bindKey: bindKey("Shift-Delete", null),
    exec: function(editor) { 
        if (editor.selection.isEmpty()) {
            editor.remove("left");
        } else {
            return false;
        }
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removetolinestart",
    description: nls("commands.removetolinestart", "Remove to line start"),
    bindKey: bindKey("Alt-Backspace", "Command-Backspace"),
    exec: function(editor) { editor.removeToLineStart(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removetolineend",
    description: nls("commands.removetolineend", "Remove to line end"),
    bindKey: bindKey("Alt-Delete", "Ctrl-K|Command-Delete"),
    exec: function(editor) { editor.removeToLineEnd(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removetolinestarthard",
    description: nls("commands.removetolinestarthard", "Remove to line start hard"),
    bindKey: bindKey("Ctrl-Shift-Backspace", null),
    exec: function(editor) {
        var range = editor.selection.getRange();
        range.start.column = 0;
        editor.session.remove(range);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removetolineendhard",
    description: nls("commands.removetolineendhard", "Remove to line end hard"),
    bindKey: bindKey("Ctrl-Shift-Delete", null),
    exec: function(editor) {
        var range = editor.selection.getRange();
        range.end.column = Number.MAX_VALUE;
        editor.session.remove(range);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removewordleft",
    description: nls("commands.removewordleft", "Remove word left"),
    bindKey: bindKey("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
    exec: function(editor) { editor.removeWordLeft(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "removewordright",
    description: nls("commands.removewordright", "Remove word right"),
    bindKey: bindKey("Ctrl-Delete", "Alt-Delete"),
    exec: function(editor) { editor.removeWordRight(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "outdent",
    description: nls("commands.outdent", "Outdent"),
    bindKey: bindKey("Shift-Tab", "Shift-Tab"),
    exec: function(editor) { editor.blockOutdent(); },
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
}, {
    name: "indent",
    description: nls("commands.indent", "Indent"),
    bindKey: bindKey("Tab", "Tab"),
    exec: function(editor) { editor.indent(); },
    multiSelectAction: "forEach",
    scrollIntoView: "selectionPart"
}, {
    name: "blockoutdent",
    description: nls("commands.blockoutdent", "Block outdent"),
    bindKey: bindKey("Ctrl-[", "Ctrl-["),
    exec: function(editor) { editor.blockOutdent(); },
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
}, {
    name: "blockindent",
    description: nls("commands.blockindent", "Block indent"),
    bindKey: bindKey("Ctrl-]", "Ctrl-]"),
    exec: function(editor) { editor.blockIndent(); },
    multiSelectAction: "forEachLine",
    scrollIntoView: "selectionPart"
}, {
    name: "insertstring",
    description: nls("commands.insertstring", "Insert string"),
    exec: function(editor, str) { editor.insert(str); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "inserttext",
    description: nls("commands.inserttext", "Insert text"),
    exec: function(editor, args) {
        editor.insert(lang.stringRepeat(args.text  || "", args.times || 1));
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "splitline",
    description: nls("commands.splitline", "Split line"),
    bindKey: bindKey(null, "Ctrl-O"),
    exec: function(editor) { editor.splitLine(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "transposeletters",
    description: nls("commands.transposeletters", "Transpose letters"),
    bindKey: bindKey("Alt-Shift-X", "Ctrl-T"),
    exec: function(editor) { editor.transposeLetters(); },
    multiSelectAction: function(editor) {editor.transposeSelections(1); },
    scrollIntoView: "cursor"
}, {
    name: "touppercase",
    description: nls("commands.touppercase", "To uppercase"),
    bindKey: bindKey("Ctrl-U", "Ctrl-U"),
    exec: function(editor) { editor.toUpperCase(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "tolowercase",
    description: nls("commands.tolowercase", "To lowercase"),
    bindKey: bindKey("Ctrl-Shift-U", "Ctrl-Shift-U"),
    exec: function(editor) { editor.toLowerCase(); },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "autoindent",
    description: nls("commands.autoindent", "Auto Indent"),
    bindKey: bindKey(null, null),
    exec: function(editor) { editor.autoIndent(); },
    scrollIntoView: "animate"
}, {
    name: "expandtoline",
    description: nls("commands.expandtoline", "Expand to line"),
    bindKey: bindKey("Ctrl-Shift-L", "Command-Shift-L"),
    exec: function(editor) {
        var range = editor.selection.getRange();

        range.start.column = range.end.column = 0;
        range.end.row++;
        editor.selection.setRange(range, false);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "openlink",
    bindKey: bindKey("Ctrl+F3", "F3"),
    exec: function(editor) { editor.openLink(); }
}, {
    name: "joinlines",
    description: nls("commands.joinlines", "Join lines"),
    bindKey: bindKey(null, null),
    exec: function(editor) {
        var isBackwards = editor.selection.isBackwards();
        var selectionStart = isBackwards ? editor.selection.getSelectionLead() : editor.selection.getSelectionAnchor();
        var selectionEnd = isBackwards ? editor.selection.getSelectionAnchor() : editor.selection.getSelectionLead();
        var firstLineEndCol = editor.session.doc.getLine(selectionStart.row).length;
        var selectedText = editor.session.doc.getTextRange(editor.selection.getRange());
        var selectedCount = selectedText.replace(/\n\s*/, " ").length;
        var insertLine = editor.session.doc.getLine(selectionStart.row);

        for (var i = selectionStart.row + 1; i <= selectionEnd.row + 1; i++) {
            var curLine = lang.stringTrimLeft(lang.stringTrimRight(editor.session.doc.getLine(i)));
            if (curLine.length !== 0) {
                curLine = " " + curLine;
            }
            insertLine += curLine;
        }

        if (selectionEnd.row + 1 < (editor.session.doc.getLength() - 1)) {
            // Don't insert a newline at the end of the document
            insertLine += editor.session.doc.getNewLineCharacter();
        }

        editor.clearSelection();
        editor.session.doc.replace(new Range(selectionStart.row, 0, selectionEnd.row + 2, 0), insertLine);

        if (selectedCount > 0) {
            // Select the text that was previously selected
            editor.selection.moveCursorTo(selectionStart.row, selectionStart.column);
            editor.selection.selectTo(selectionStart.row, selectionStart.column + selectedCount);
        } else {
            // If the joined line had something in it, start the cursor at that something
            firstLineEndCol = editor.session.doc.getLine(selectionStart.row).length > firstLineEndCol ? (firstLineEndCol + 1) : firstLineEndCol;
            editor.selection.moveCursorTo(selectionStart.row, firstLineEndCol);
        }
    },
    multiSelectAction: "forEach",
    readOnly: true
}, {
    name: "invertSelection",
    description: nls("commands.invert-selection", "Invert selection"),
    bindKey: bindKey(null, null),
    exec: function(editor) {
        var endRow = editor.session.doc.getLength() - 1;
        var endCol = editor.session.doc.getLine(endRow).length;
        var ranges = editor.selection.rangeList.ranges;
        var newRanges = [];

        // If multiple selections don't exist, rangeList will return 0 so replace with single range
        if (ranges.length < 1) {
            ranges = [editor.selection.getRange()];
        }

        for (var i = 0; i < ranges.length; i++) {
            if (i == (ranges.length - 1)) {
                // The last selection must connect to the end of the document, unless it already does
                if (!(ranges[i].end.row === endRow && ranges[i].end.column === endCol)) {
                    newRanges.push(new Range(ranges[i].end.row, ranges[i].end.column, endRow, endCol));
                }
            }

            if (i === 0) {
                // The first selection must connect to the start of the document, unless it already does
                if (!(ranges[i].start.row === 0 && ranges[i].start.column === 0)) {
                    newRanges.push(new Range(0, 0, ranges[i].start.row, ranges[i].start.column));
                }
            } else {
                newRanges.push(new Range(ranges[i-1].end.row, ranges[i-1].end.column, ranges[i].start.row, ranges[i].start.column));
            }
        }

        editor.exitMultiSelectMode();
        editor.clearSelection();

        for(var i = 0; i < newRanges.length; i++) {
            editor.selection.addRange(newRanges[i], false);
        }
    },
    readOnly: true,
    scrollIntoView: "none"
}, {
    name: "addLineAfter",
    description: nls("commands.add-line-after", "Add new line after the current line"),
    exec: function(editor) {
        editor.selection.clearSelection();
        editor.navigateLineEnd();
        editor.insert("\n");
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "addLineBefore",
    description: nls("commands.add-line-before", "Add new line before the current line"),
    exec: function(editor) {
        editor.selection.clearSelection();
        var cursor = editor.getCursorPosition();
        editor.selection.moveTo(cursor.row - 1, Number.MAX_VALUE);
        editor.insert("\n");
        if (cursor.row === 0) editor.navigateUp();
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "openCommandPallete",
    exec: function(editor) {
        console.warn("This is an obsolete command. Please use `openCommandPalette` instead.");
        editor.prompt({ $type: "commands" });
    },
    readOnly: true
}, {
    name: "openCommandPalette",
    description: nls("commands.open-command-palette", "Open command palette"),
    bindKey: bindKey("F1", "F1"),
    exec: function(editor) {
        editor.prompt({ $type: "commands" });
    },
    readOnly: true
}, {
    name: "modeSelect",
    description: nls("commands.mode-select", "Change language mode..."),
    bindKey: bindKey(null, null),
    exec: function(editor) {
        editor.prompt({ $type: "modes" });
    },
    readOnly: true
}];

for (var i = 1; i < 9; i++) {
    exports.commands.push({
        name: "foldToLevel" + i,
        description: nls("commands.fold-to-level", "Fold To Level $0", [i]),
        level: i,
        exec: function(editor) { editor.session.foldToLevel(this.level); },
        scrollIntoView: "center",
        readOnly: true
    });
}
