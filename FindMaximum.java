public class FindMaximum {
    public static int findMaximum(int[] arr) {
        if (arr.length == 0) {
            throw new IllegalArgumentException("Array is empty");
        }

        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[0] > arr[i]) {
                max = arr[0];
            } else {
                max = arr[i];
            }
        }

        return max;
    }

    public static void main(String[] args) {
        int[] numbers = {3, 7, 2, 9, 5};
        System.out.println(findMaximum(numbers));
    }
}