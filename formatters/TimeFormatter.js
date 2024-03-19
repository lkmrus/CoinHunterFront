import { TimeFormatEnum } from '@/enums/TimeFormatEnum'

const MINUTE_INTERVAL_IN_SECONDS = 60

class CustomDate extends Date {
  getFullYearShort () {
    return Number(String(this.getFullYear()).slice(2, 4))
  }

  getGmt () {
    let gmtIndicator = this.getTimezoneOffset() / MINUTE_INTERVAL_IN_SECONDS * -1

    if (gmtIndicator > 0) {
      gmtIndicator = `+${gmtIndicator}`
    }

    return `GMT ${gmtIndicator}`
  }
}

export class TimeFormatter {
  static formatTime (format, timestamp) {
    const dateTime = new CustomDate(timestamp)
    let formattedDateArray = format

    Object.keys(TimeFormatEnum).forEach((splitValue) => {
      const splitedFormat = formattedDateArray.split(splitValue)
      // .getTimezoneOffset()
      if (splitedFormat.length > 1) {
        let timeChapter = dateTime[TimeFormatEnum[splitValue]]()

        if (splitValue === TimeFormatEnum.mm) {
          timeChapter = timeChapter + 1
        }

        formattedDateArray = splitedFormat.join(
          String(timeChapter).length === 1
            ? `0${timeChapter}`
            : timeChapter
        )
      }
    })

    return formattedDateArray
  }
}
