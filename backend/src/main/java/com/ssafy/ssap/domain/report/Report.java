package com.ssafy.ssap.domain.report;

import com.ssafy.ssap.domain.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @Column(columnDefinition = "text")
    private String detail;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "target")
    private User target;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "reporter")
    private User reporter;

    @NotNull
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category")
    private ReportCategoryNs category;
    
}