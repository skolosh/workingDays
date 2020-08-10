import React, {Component} from 'react'
import moment from 'moment';
import '../index.css';
import * as ReactDOM from 'react-dom';
import { extend, createElement } from '@syncfusion/ej2-base';
import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, ViewDirective} from '@syncfusion/ej2-react-schedule'
import {fetchCountries} from '../api'
import axios from 'axios';


class Calender extends Component {
    state = {
        dateObject: moment(),
        allmonths : moment.months(),
        showMonthTable: false,
        twelveyears: []
    }
   
    weekdayshort = moment.weekdaysShort();

    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
                        .startOf("month")
                        .format("d");
        return firstDay;
    }
    
    daysInMonth = () => {
      let dateObject = this.state.dateObject;
      const currentMonthDates = new Array(moment(dateObject).daysInMonth())
                                .fill(null)
                                .map((x, i) => 
                                moment().startOf('month').add(i, 'days'));
        return currentMonthDates;
    }

    currentDay = () => {
      return this.state.dateObject.format("D");
    }

    month = () => {
      return this.state.dateObject.format("MMMM");
    };

    
    MonthList = () => {
      return this.state.allmonths;
    }
    
    setMonth = month => {
      let monthNo = this.state.allmonths.indexOf(month);// get month number 
      let dateObject = Object.assign({}, this.state.dateObject);
      dateObject = moment(dateObject).set("month", monthNo); // change month value
      this.setState({
        dateObject: dateObject, // add to state
        showMonthTable: !this.state.showMonthTable
      });
    }
    
    showMonth = (e, month) => {
      this.setState({
        showMonthTable: !this.state.showMonthTable
      });
    }
    


    // Year data
    year = () => {
      return this.state.dateObject.format("Y");
    }

    getDates(startDate, stopDate) {
      var dateArray = [];
      var currentDate = moment(startDate);
      var stopDate = moment(stopDate);
      while (currentDate <= stopDate) {
        dateArray.push(moment(currentDate).format("YYYY"));
        currentDate = moment(currentDate).add(1, "year");
      }
      return dateArray;
    }

    setYear = year => {
      // alert(year)
      //console.log(this.getDates)
      let yearNo = this.state.twelveyears.indexOf(year);// get month number 
      let dateObject = Object.assign({}, this.state.dateObject);
      dateObject = moment(dateObject).set("year", yearNo);
      this.setState({
        dateObject: dateObject
      });
    };















    render(){
         let weekdayshortname = this.weekdayshort.map(day => {
            return(
                <th key = {day} className = "week-day">
                    {day}
                </th>
            );
        });

        let blanks = [];
        for(let i=0; i< this.firstDayOfMonth(); i++){
            blanks.push(
            <td className="calendar-day empty">{""}</td>
            );
        }

        let daysInMonth = [];
        for(let d=1; d<= this.daysInMonth().length; d++){
          let currentDay = d == this.currentDay() ? "today" : "";
            daysInMonth.push(
                <td key={d} className={`calendar-day ${currentDay}`}>
                    {d}
                </td>
            )
        }

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
              cells.push(row); // if index not equal 7 that means not go to next week
            } else {
              rows.push(cells); // when reach next week we contain all td in last week to rows 
              cells = []; // empty container 
              cells.push(row); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
              rows.push(cells);
            }
          });

          let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>;
          });

          let months = [];
          this.MonthList().map(data => {
            months.push(
              <td
                key={data}
                className="calendar-month"
                onClick={e => {
                  this.setMonth(data);
                }}
              >
                <span>{data}</span>
              </td>
            );
          });

            let rows1 = [];
            let cells1 = [];

            months.forEach((row, i) => { 
              if (i % 3 !== 0 || i == 0) { // except zero index 
                  cells1.push(row); 
              } else { 
                  rows1.push(cells1); 
                  cells1 = [];
                  cells1.push(row); 
              }
           });
           rows1.push(cells1); // add last row

           let monthlist = rows1.map((d, i) => {
            return <tr>{d}</tr>;
         });



         let Props = this.state.dateObject.format("Y");
          let years = [];
          let nextten = moment()
            .set("year", Props)
            .add("year", 12)
            .format("Y");  
          let twelveyears = this.getDates(Props, nextten);
          this.setState({
            twelveyears: twelveyears
          });
          
          twelveyears.map((data) => {
            years.push(
              <td
                key={data}
                className="calendar-month"
                onClick={e => {
                  this.setYear(data);
                }}
              >
                <span>{data}</span>
              </td>
            );
          });
          let rows2 = [];
          let cells2 = [];
      
          years.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
              cells2.push(row);
            } else {
              rows2.push(cells2);
              cells2 = [];
              cells2.push(row);
            }
          });
          rows2.push(cells2);

          let yearlist = rows2.map((d, i) => {
            return <tr>{d}</tr>;
          });
         



         
    
        return(
            <>
            
            <h1>Calendar</h1>
            <div className="tail-datetime-calendar">
              <div className="calendar-navi" >
                {this.month()}

                <span className="right calendar-label">
                  {this.year()}
                </span>
              </div>
            </div>

            <table className="calendar-month">
              <thead>
                <tr>
                  <th colSpan="4" >Select a Yeah</th>
                </tr>
              </thead>  
            <tbody>{yearlist}</tbody>
            </table>


            <table className="calendar-month">
            <thead>
              <tr>
                <th className="left" colSpan="4" 
                onClick={e =>{
                  this.showMonth();
                }}
                >Select a Month</th>
              </tr>
              
            </thead>
                        
              {this.state.showMonthTable &&  <tbody>{monthlist}</tbody>}

            
            
          </table>

          
            {!this.state.showMonthTable && (
              <table className="calendar-day">
                <thead>
                  <tr className ="blue darken-7">{weekdayshortname}</tr>
                </thead>
                <tbody>{daysinmonth}</tbody>
              </table>)
            }
            
          
      

            </>
        )

        
    }
}

export default Calender