-- DropForeignKey
ALTER TABLE "imagenes" DROP CONSTRAINT "imagenes_idComentario_fkey";

-- AddForeignKey
ALTER TABLE "imagenes" ADD CONSTRAINT "imagenes_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "comentarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
