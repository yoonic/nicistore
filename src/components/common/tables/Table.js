/**
 * Imports
 */
import React from 'react';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class Table extends React.Component {

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./Table.scss');
    }

    //*** Template ***//

    render() {

        // Headings size
        let headingsSize = 'medium';
        if (['small', 'large'].indexOf(this.props.headingsSize) != -1) {
            headingsSize = this.props.headingsSize;
        }

        return (
            <div className="table">
                <table className="table__table">
                    <thead>
                        <tr className="table__row">
                            {this.props.headings.map(function (heading, idx) {
                                return (
                                    <th className="table__heading" key={idx}>
                                        <Text size={headingsSize} weight="bold">{heading}</Text>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {this.props.rows.map(function (row, idx) {
                            let rowClass = 'table__row';
                            if (['info', 'success', 'warning', 'error'].indexOf(row.highlight) !== -1) {
                                rowClass += ` table__row--${row.highlight}`;
                            }
                            return (
                                <tr className={rowClass} key={idx}>
                                    {row.data.map(function (data, idx) {
                                        return <td className="table__data" key={idx}>{data}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

/**
 * Exports
 */
export default Table;
