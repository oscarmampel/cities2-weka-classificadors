package com.eetac.cities2.Controller;


import com.eetac.cities2.Indoor;
import sun.text.resources.FormatData;

import javax.imageio.ImageIO;
import javax.inject.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;

@Path("/image")
@Singleton
public class Service {
    private Indoor indoor;
    public Service() throws Exception {
        indoor = new Indoor();
    }

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response add(String image) {
        double code = 3;
        try {
            System.out.println(image);
            String base64Image = image.split(",")[1];
            byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
            File imageFile = new File("cities2-weka-classificadors\\datasets\\"+image+".jpg");
            try {
                BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(imageBytes));
                ImageIO.write(bufferedImage, "png", imageFile);
                code = indoor.classifica(imageFile.getName(), imageFile.getPath());
            }
            catch(Exception e){
                e.printStackTrace();
            }

            if (code == 0 || code == 1 || code == 2) {
                return Response.status(Response.Status.CREATED).entity(code)
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                        .allow("OPTIONS").build();//201
            } else {
                return Response.status(Response.Status.BAD_REQUEST).entity("Bad request")
                        .header("Access-Control-Allow-Origin", "*")
                        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                        .allow("OPTIONS").build();//400
            }
        }catch(Exception ex){
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Internal error")
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
                    .allow("OPTIONS").build();//500
        }
    }
}
