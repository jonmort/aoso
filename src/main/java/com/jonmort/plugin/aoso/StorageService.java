package com.jonmort.plugin.aoso;

import com.atlassian.activeobjects.tx.Transactional;

@Transactional
public interface StorageService {
    void store(Storage storage);
    Storage get(String scope, String dataId);
    Storage create(String scope, String dataId, String data);
    void remove(Storage storage);
    Iterable<Storage> search(String scope, String searchString, int noResults, int offset);
}
