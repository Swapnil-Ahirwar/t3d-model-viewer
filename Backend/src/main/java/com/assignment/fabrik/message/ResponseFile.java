package com.assignment.fabrik.message;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseFile {

    public String name;
    public String url;
    public String type;
    public long size;
}
