-- AlterTable
ALTER TABLE "comentarios" ADD COLUMN     "idUsuario" INTEGER;

-- AddForeignKey
ALTER TABLE "comentarios" ADD CONSTRAINT "comentarios_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
