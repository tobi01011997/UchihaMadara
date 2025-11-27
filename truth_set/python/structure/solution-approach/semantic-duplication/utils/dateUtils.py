def format_date(date, format='YYYY-MM-DD'):
    year = date.year
    month = f"{date.month:02d}"
    day = f"{date.day:02d}"
    
    if format == 'MM/DD/YYYY':
        return f"{month}/{day}/{year}"
    elif format == 'DD-MM-YYYY':
        return f"{day}-{month}-{year}"
    else:
        return f"{year}-{month}-{day}"
\ No newline at end of file