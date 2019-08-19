import React from "react";
import DateTimePicker from 'react-datetime-picker';


class BookingForm extends React.Component {

  constructor(props) {
    super(props);
    console.log("construtor", props);
    const booking = props.booking;
    if (booking) {
      let start = booking.start_date;
      let end = booking.end_date;
      booking.start_date = (start) ? new Date(start): null;
      booking.end_date = (end) ? new Date(end) : null;
    }
    this.state = Object.assign({}, {message:''}, booking?booking:{room: 'A', start_date: null, end_date: null});

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(event) {
    this.setState({room: event.target.value});
  }
  handleInputChange(name, date) {
    this.setState({
      [name]: date, message: ''
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    const start = this.state.start_date;
    const end = this.state.end_date;
    if (start && end && (end.valueOf() - start.valueOf() <= 0)) {
      this.setState({message: 'Start date should be lower than End date'});
    } else {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={"booking"}>
        <label htmlFor="select-room">
          Pick a room:</label>
          <select id="select-room" value={this.state.room} onChange={this.handleChange}>
            <option value="A">Room A</option>
            <option value="B">Room B</option>
            <option value="C">Room C</option>
          </select>

        <label>
          From: </label>
          <DateTimePicker
            onChange={(date) => this.handleInputChange('start_date', date)}
            value={this.state.start_date}
            format="MM-dd-yyyy HH:mm" />

        <label>
          To: </label>
          <DateTimePicker
            onChange={(date) => this.handleInputChange('end_date', date)}
            value={this.state.end_date}
            format="MM-dd-yyyy HH:mm" />

        <input type="submit" value="Submit"/>
        <div className="error">{this.state.message}</div>
      </form>
    );
  }
}

export default BookingForm;
