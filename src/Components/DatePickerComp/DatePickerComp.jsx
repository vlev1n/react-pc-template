import React from 'react'
import { DatePicker } from 'antd'

import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

function toMoment(value) {
  if (value) {
    return moment(value)
  } else {
    return undefined
  }
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
      <DatePicker
        // 设置动态key才可以动态设置defaultValue
        key={defaultDate}
        format="YYYY-MM-DD HH:mm"
        showTime={{ format: 'HH:mm' }}
        defaultValue={toMoment(defaultDate)}
        onChange={this.onChangeDate}
      />
    )
  }
}

export default DatePickerComp
