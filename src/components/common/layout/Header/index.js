/**
 * Imports
 */
import React from 'react';

// Required components
import Breakpoint from '../../../core/Breakpoint';

import DesktopHeader from './DesktopHeader';
import HandheldsHeader from './HandheldsHeader';
import HeaderHighlight from './HeaderHighlight';

/**
 * Module's default component
 */
class Header extends React.Component {

    //*** Template ***//

    render() {
        return (
            <div className="header">
                <HeaderHighlight />
                <Breakpoint point="handhelds">
                    <HandheldsHeader {...this.props}></HandheldsHeader>
                </Breakpoint>
                <Breakpoint point="medium-screens">
                    <DesktopHeader {...this.props}></DesktopHeader>
                </Breakpoint>
                <Breakpoint point="wide-screens">
                    <DesktopHeader {...this.props}></DesktopHeader>
                </Breakpoint>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Header;
