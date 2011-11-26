// Unfocus 0.8 - Firefox extension providing command line switch to unfocus
// plugins and subframes
// Use: firefox -unfocus
// License: MIT
// Copyright (c) 2010 Hadrian Węgrzynowski
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// Method of focus retrieving based on code of Conkeror browser
// http://conkeror.org/

const Ci = Components.interfaces;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function unfocus() {}
unfocus.prototype = {
        classID: Components.ID("{c82bcf0e-ebff-486f-bc3e-58ab0ba5286a}"),
        contractID: "@mozilla.org/commandlinehandler/general-startup;1?type=unfocus",
        QueryInterface: XPCOMUtils.generateQI([Ci.nsICommandLineHandler]),

        /* nsICommandLineHandler */
        handle : function clh_handle(cmdLine) {
                if(!cmdLine.handleFlag("unfocus", false))
                        return;
                var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                        .getService(Ci.nsIWindowMediator);
                var bwin = wm.getMostRecentWindow("navigator:browser");

                if(bwin.document.commandDispatcher.focusedWindow) {
                        dump(bwin.document.commandDispatcher.focusedWindow);
                        dump(" fW\n");
                        bwin.document.commandDispatcher.focusedWindow.blur();
                }
                if(bwin.document.commandDispatcher.focusedElement) {
                        dump(bwin.document.commandDispatcher.focusedElement);
                        dump(" fE\n");
                        bwin.document.commandDispatcher.focusedElement.blur();
                }
                if(bwin.document.activeElement) {
                        dump(bwin.document.activeElement);
                        dump(" aE\n");
                        bwin.document.activeElement.blur();
                }

                bwin.focus();
                bwin.focus();
                cmdLine.preventDefault = true;
        },
        helpInfo : "  -unfocus             Give back focus to the browser\n",
}

if(XPCOMUtils.generateNSGetFactory)
        var NSGetFactory = XPCOMUtils.generateNSGetFactory([unfocus]);
else
        var NSGetModule = XPCOMUtils.generateNSGetModule([unfocus]);

