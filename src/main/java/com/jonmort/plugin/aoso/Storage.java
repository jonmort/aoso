package com.jonmort.plugin.aoso;

import net.java.ao.Entity;
import net.java.ao.Preload;
import net.java.ao.RawEntity;
import net.java.ao.Searchable;
import net.java.ao.schema.NotNull;
import net.java.ao.schema.PrimaryKey;

import javax.ws.rs.PathParam;

@Preload
public interface Storage extends RawEntity<String> {
    @PrimaryKey("identifier")
    @NotNull
    String getIdentifier();
    void setIdentifier(String scope);
    String getData();
    void setData(String data);
}
