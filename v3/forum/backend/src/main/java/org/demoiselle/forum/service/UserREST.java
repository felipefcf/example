package org.demoiselle.forum.service;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import org.demoiselle.forum.entity.User;
import java.util.UUID;
import java.util.logging.Logger;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import org.demoiselle.jee.core.api.crud.Result;
import org.demoiselle.jee.crud.AbstractREST;
import org.demoiselle.jee.security.annotation.Authenticated;

@Api("v1/Users")
@Path("v1/users")
//@Authenticated
@ApiImplicitParams({
    @ApiImplicitParam(name = "Authorization", value = "JWT token",
            required = true, dataType = "string", paramType = "header")
})
public class UserREST extends AbstractREST<User, UUID> {

    /**
     *
     * @return
     */
    @GET
    @Override
    @Transactional
    public Result find() {
        return bc.find();
    }
    private static final Logger LOG = Logger.getLogger(UserREST.class.getName());

}
