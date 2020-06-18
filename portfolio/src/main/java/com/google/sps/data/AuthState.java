package com.google.sps.data;

public class AuthState {
  public enum isLoggedIn {
    LOGGED_IN (true),
    LOGGED_OUT (false);

    private Boolean state;

    public Boolean getState() {
      return this.state;
    }

    private isLoggedIn(Boolean state) {
      this.state = state;
    }
  }
}