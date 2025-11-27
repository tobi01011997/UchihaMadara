def findMaximum(arr):
    if len(arr) == 0:
        raise ValueError("Array is empty")
    
    max = arr[0]
    for i in range(1, len(arr)):
        if arr[0] > arr[i]:
            max = arr[0]
        else:
            max = arr[i]
    return max

numbers = [3, 7, 2, 9, 5]
print(findMaximum(numbers))