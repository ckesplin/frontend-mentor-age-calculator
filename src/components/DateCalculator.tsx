import './DateCalculator.css'
import DateInputField from "./DateInputField"
import dayjs from "dayjs"
import {useState} from "react"
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'

const DateCalculator = () => {
  const [selectedDay, setSelectedDay] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<number>()
  const [selectedYear, setSelectedYear] = useState<number>()
  const [years, setYears] = useState("--")
  const [months, setMonths] = useState("--")
  const [days, setDays] = useState("--")
  const [yearError, setYearError] = useState(false)
  const [dayError, setDayError] = useState(false)
  const [monthError, setMonthError] = useState(false)
  const [mousePressed, setMousePressed] = useState(false)

  const today = dayjs()

  dayjs.extend(customParseFormat);
  dayjs.extend(duration);

  function getDateDifference(startDate: string, endDate: string) {
    const start = dayjs(startDate, 'MM-DD-YYYY');
    const end = dayjs(endDate, 'MM-DD-YYYY');

    const diffDuration = dayjs.duration(end.diff(start));
    const y = diffDuration.years();
    const m = diffDuration.months();
    const d = diffDuration.days();

    return {y, m, d,};
  }

  const handleButtonClick = () => {
    const endDate = dayjs().format('MM-DD-YYYY').toString()
    const startDate = dayjs(`${selectedMonth}-${selectedDay}-${selectedYear}`).format('MM-DD-YYYY').toString()
    if (!selectedDay || !selectedMonth || !selectedYear || dayjs(startDate, 'MM-DD-YYYY') > dayjs(endDate, 'MM-DD-YYYY')) {
      if (!selectedDay || selectedDay > 31) setDayError(true)
      if (!selectedMonth || selectedMonth > 12) setMonthError(true)
      if (!selectedYear) setYearError(true)
      if (dayjs(startDate, 'MM-DD-YYYY') > dayjs(endDate, 'MM-DD-YYYY')) {
        setDayError(true)
        setMonthError(true)
        setYearError(true)
      }
      setYears("--")
      setMonths("--")
      setDays("--")
      return
    }

    setDayError(false)
    setYearError(false)
    setMonthError(false)

    const {y, m, d} = getDateDifference(startDate, endDate)
    setYears(y.toString())
    setMonths(m.toString())
    setDays(d.toString())
  }

  return (
    <div className="flex-center">
      <div className="card">
        <div className="input-container">
          <DateInputField label="Day" placeholder="DD" updateFieldCallback={(d) => setSelectedDay(d)} error={dayError}/>
          <DateInputField label="Month" placeholder="MM" updateFieldCallback={(m) => setSelectedMonth(m)}
                          error={monthError}/>
          <DateInputField label="Year" placeholder="YYYY" updateFieldCallback={(y) => setSelectedYear(y)}
                          error={yearError}/>
        </div>
        <div className="button-container">
          <div className="divider"/>
          <button
            className={`button ${mousePressed && 'press'}`}
            onClick={handleButtonClick}
            onMouseDown={() => setMousePressed(true)}
            onMouseUp={() => setMousePressed(false)}
          >
            <img src="../../assets/images/icon-arrow.svg" alt="arrow-icon" className="arrow-icon"/>
          </button>
        </div>
        <div className="date-display-container">
          <div className="date-display-text-container">
            <div className="date-display-number">{isNaN(parseInt(years)) ? "--" : years}</div>
            <div className="date-display-text">years</div>
          </div>
          <div className="date-display-text-container">
            <div className="date-display-number">{isNaN(parseInt(months)) ? "--" : months}</div>
            <div className="date-display-text">months</div>
          </div>
          <div className="date-display-text-container">
            <div className="date-display-number">{isNaN(parseInt(days)) ? "--" : days}</div>
            <div className="date-display-text">days</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateCalculator
