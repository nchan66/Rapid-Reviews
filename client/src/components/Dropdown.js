import React, { Component } from 'react';
import Select from 'react-select';

const options = [
    {label: 'Most Recent', value: 'mostR'},
    {label: 'Most Likes', value: 'mostL'},
    {label: 'Most Dislikes', value: 'mostD'}
];

class Dropdown extends Component {
    state = {
        selectedOption: null,
    };
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`option selected:`, selectedOption);
    };

    render () {
        const { selectedOption } = this.state;
        return (
            <div className="container">
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={options}
                />
            </div>
            

        );

    }
}
export default Dropdown;