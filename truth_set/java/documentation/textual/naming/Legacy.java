class UserData {
    public String nm;
    public String a;

    public UserData(String nm, String a) {
        this.nm = nm;
        this.a = a;
    }
}

public class Legacy {
    public static UserData proc(UserData u) {
        if (u == null || u.nm == null) {
            throw new IllegalArgumentException("Invalid input");
        }

        u.a = u.nm.toUpperCase();
        return u;
    }

    public static void main(String[] args) {
        UserData userData = new UserData("john doe", "");
        UserData result = proc(userData);
        System.out.println(result.nm + " " + result.a);
    }
}
\ No newline at end of file