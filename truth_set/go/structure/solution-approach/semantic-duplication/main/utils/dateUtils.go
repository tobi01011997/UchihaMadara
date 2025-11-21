package utils

import "time"

func FormatDate(date time.Time, format string) string {
	year := date.Format("2006")
	month := date.Format("01")
	day := date.Format("02")

	switch format {
	case "MM/DD/YYYY":
		return month + "/" + day + "/" + year
	case "DD-MM-YYYY":
		return day + "-" + month + "-" + year
	default:
		return year + "-" + month + "-" + day
	}
}
\ No newline at end of file