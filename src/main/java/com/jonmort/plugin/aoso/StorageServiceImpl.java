package com.jonmort.plugin.aoso;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.sal.api.user.UserManager;
import com.google.common.collect.ImmutableMap;
import net.java.ao.Query;

import java.util.Arrays;

import static com.google.common.base.Preconditions.checkNotNull;

public class StorageServiceImpl implements StorageService {
    private final ActiveObjects ao;
    private final UserManager userManager;

    public StorageServiceImpl(ActiveObjects ao, UserManager userManager) {
        this.userManager = userManager;
        this.ao = checkNotNull(ao);
    }

    public void store(Storage storage) {
        storage.save();
    }

    public Storage get(String scope, String generic, String specific, String dataid) {
        return ao.get(Storage.class, createIdentifierString(scope, generic, specific, dataid));
    }

    public Storage create(String scope, String generic, String specific, String dataid, String data) {
        final Storage storage = ao.create(Storage.class, ImmutableMap.of("identifier", (Object) createIdentifierString(scope, generic, specific, dataid)));
        storage.setData(data);
        storage.save();
        return storage;
    }

    public void remove(Storage storage) {
        ao.delete(storage);
    }

    public Iterable<Storage> search(String scope, String searchString, int noResults, int offset) {
        return Arrays.asList(ao.find(Storage.class, Query.select().where("IDENTIFIER LIKE ?", String.format("%s/%s%%", scope, searchString)).limit(noResults).offset(offset)));
    }

    private String createIdentifierString(String scope, String generic, String specific, String dataid) {
        if ("user".equals(scope)) {
            return String.format("%s/%s/%s/%s/%s", scope, userManager.getRemoteUsername(), generic, specific, dataid);
        }
        return String.format("%s/%s/%s/%s",  scope, generic, specific, dataid);
    }
}
