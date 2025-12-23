package com.example.danceplatform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RootController {

    @GetMapping("/health")
    @ResponseBody
    public String health() {
        return "OK";
    }

    @GetMapping({"/", "/{path:^(?!api|assets|uploads|h2-console)[^\\.]*$}", "/{path:^(?!api|assets|uploads|h2-console)[^\\.]*$}/**"})
    public String forward() {
        return "forward:/index.html";
    }
}
