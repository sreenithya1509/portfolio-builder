package com.portfolio.backend;

import com.portfolio.backend.model.Portfolio;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class PortfolioController {

    private List<Portfolio> portfolios = new ArrayList<>();

    @PostMapping("/portfolios")
    public Portfolio savePortfolio(@RequestBody Portfolio portfolio) {
        portfolios.add(portfolio);
        return portfolio;
    }

    @GetMapping("/portfolios")
    public List<Portfolio> getPortfolios() {
        return portfolios;
    }
}

