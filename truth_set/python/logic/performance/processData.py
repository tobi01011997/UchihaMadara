def process_data(data):
    new_data = data.copy()
    for i in range(len(new_data)):
        new_data[i] *= 2
    return new_data

numbers = list(range(1000000))
processed_array = process_data(numbers)
\ No newline at end of file