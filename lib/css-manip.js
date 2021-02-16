'use babel'
// todo: add enum to string mappings for interesting elements

export default class CssManip 
{
    set_selector(selector, ruleText) {
        ruleText = ruleText.replace(/;/g, '!important;'); // EVERYTHING IS IMPORTANT!!
        // todo: store this instead of doing a lookup every time (wrap this in a class)
        let found_style = document.getElementById('live_style');
        if (found_style === null)
        {
            let css = document.createElement('style');
            css.id = 'live_style';
            css.type = 'text/css'; // todo: deprecated fix?
            document.head.appendChild(css);
            found_style = document.getElementById('live_style');
        }
        let sheet = found_style.sheet;
        let found = false;
        for (let rule of sheet.cssRules)
        {
            if (rule.selectorText === selector)
            {
            rule.style.cssText = ruleText;
            found = true;
            }
        }
        if (found == false)
        {
            sheet.insertRule(selector + ' { ' + ruleText + ' }',sheet.cssRules.length);
        }
    }
}
