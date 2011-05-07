package com.jonmort.plugin.aoso;

import com.atlassian.activeobjects.tx.Transactional;

@Transactional
public interface StorageService {
    void store(Storage storage);
    Storage get(String scope, String generic, String specific, String dataid);
    Storage create(String scope, String generic, String specific, String dataid, String data);
    void remove(Storage storage);
}
