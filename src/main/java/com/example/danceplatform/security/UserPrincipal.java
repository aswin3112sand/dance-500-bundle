package com.example.danceplatform.security;

import com.example.danceplatform.model.User;
import com.example.danceplatform.model.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {

    private final Long id;
    private final String email;
    private final String password;
    private final UserRole role;
    private final boolean unlockedBundle;

    public UserPrincipal(Long id, String email, String password, UserRole role, boolean unlockedBundle) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.unlockedBundle = unlockedBundle;
    }

    public static UserPrincipal from(User user) {
        return new UserPrincipal(user.getId(), user.getEmail(), user.getPasswordHash(), user.getRole(), user.isUnlockedBundle());
    }

    public Long getId() {
        return id;
    }

    public boolean isUnlockedBundle() {
        return unlockedBundle;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
