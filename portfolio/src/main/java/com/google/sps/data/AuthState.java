package com.google.sps.data;

public class AuthState {
  public enum isLoggedIn {
    LOGGED_IN (1),
    LOGGED_OUT (0);

    private int state;

    public int getState() {
      return this.state;
    }

    private isLoggedIn(int state) {
      this.state = state;
    }
  }
}