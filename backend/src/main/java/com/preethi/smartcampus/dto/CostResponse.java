package com.preethi.smartcampus.dto;

public class CostResponse {

    private double cost;
    private String currency;

    public CostResponse(double cost) {
        this.cost = cost;
        this.currency = "INR";
    }

    public double getCost() {
        return cost;
    }

    public String getCurrency() {
        return currency;
    }
}