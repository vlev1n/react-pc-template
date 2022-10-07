import React from 'react'
import { DatePicker } from 'antd'

import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export const toMoment = (dateArr) => {
  if (!dateArr) {
    return [undefined, undefined]
  }
  if (!dateArr.length || !dateArr[0]) {
    return [undefined, undefined]
  }
  let time = [moment(dateArr[0]), moment(dateArr[1])]
  return time
}

class DatePickerComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      defaultDate: undefined,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { defaultValue } = nextProps
    if (defaultValue !== prevState.defaultValue) {
      return {
        defaultDate: defaultValue,
      }
    }
    return null
  }
  onChangeDate = (dateMoment, date) => {
    this.props.onSelectedDate(date)
  }
  render() {
    const { defaultDate } = this.state
    return (
      <DatePicker.RangePicker
        // 设置动态key才可以动态设置defaultValue
        key={defaultDate}
        defaultValue={toMoment(defaultDate)}
        onChange={this.onChangeDate}
      />
    )
  }
}

export default DatePickerComp
