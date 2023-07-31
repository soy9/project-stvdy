package com.ssafy.ssap.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class RoomCreateDto {

    private Long userNo;
    private String title;
    private long endHour;
    private long endMinute;
    private int quota;
    private Boolean isPrivacy;
    private String password;
    private String imagePath;
    private String rule;
    private String sessionId;

}
