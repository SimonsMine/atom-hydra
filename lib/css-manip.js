'use babel'
// todo: add enum to string mappings for interesting elements

export const CssConstants = {
    select : {
        selection : '.selection .region',
        smart_edge : '.region',
        comment : '.syntax--comment', // can have cursor property
        flash : '.hydra-flash',
        cursor : '.cursor'
    },

    // none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit
    cursor_style : {
        none : 'none',
        dotted : 'dotted',
        dashed : 'dashed',
        solid : 'solid',
        double : 'double',
        groove : 'groove'
    },

    shadow : function(x, y, blur, color) {
        return `${x}px ${y}px ${blur}px ${color}`;
    },

    make_shadow : function(shadows) {
        var shadowString = 'text-shadow: ';
        for (const shadow of shadows) {
            shadowString += shadow;
            shadowString += ',';
        }
        shadowString = shadowString.slice(0,-1);
        shadowString += ';';
        console.log(shadowString);
        return shadowString;
    }
}

export default class CssManip 
{
    constructor() {
        let css = document.createElement('style');
        css.id = 'live_style';
        css.type = 'text/css'; // todo: deprecated fix?
        document.head.appendChild(css);
        this.live_style = document.getElementById('live_style');
    }

    set_raw(selector, ruleText) {
        ruleText = ruleText.replace(/;/g, '!important;'); // EVERYTHING IS IMPORTANT!!
        let sheet = this.live_style.sheet;
        let found = false;
        for (let rule of sheet.cssRules)
        {
            if (rule.selectorText === selector)
            {
                rule.style.cssText = ruleText;
                found = true;
                break;
            }
        }
        if (found == false)
        {
            sheet.insertRule(selector + ' { ' + ruleText + ' }',sheet.cssRules.length);
        }
    }

    set_rule_raw(text) {
        let sheet = this.live_style.sheet;
        let found = false;
        for (let rule of sheet.cssRules)
        {
            if (rule.selectorText === selector)
            {
                rule.style.cssText = ruleText;
                found = true;
                break;
            }
        }
        if (found == false)
        {
            sheet.insertRule(text, sheet.cssRules.length);
        }
    }

    set_shadow(selector, shadows) {
        this.set_raw(selector, ss.make_shadow(shadows));
    }

    set_color(selector, color) {
        if (typeof (color) === 'string')
        {
            this.set_raw(selector, 'background-color: ' + color + ';')
        }
        else if (Array.isArray(color))
        {
            let colorString;
            switch(color.length)
            {
                case 0:
                    colorString = '0, 0, 0, 1.0';
                    break;
                case 1:
                    colorString = color[0] + ', ' + color[0] + ', ' + color[0] + ', ' + ', 1.0';
                    break;
                case 3:
                    colorString = color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + ', 1.0';
                    break;
                case 4:
                    colorString = color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + color[3];
                    break;
                default:
                    colorString = '0, 0, 0, 1.0';
                    break;
    
            }
            this.set_raw(selector, 'background-color: rgba(' + colorString + ');');
        }
    }

    // todo: cursor animation?
    //  auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing
}

/*
const editor = atom.workspace.getActiveTextEditor();
marker = editor.getSelectedText();
if (editor) {
decoration = editor.decorateMarker(marker, {type: 'line', class: 'mystyle'});

  const selection = editor.getSelectedText()
}
*/