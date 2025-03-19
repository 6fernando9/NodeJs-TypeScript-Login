-- CreateTable
CREATE TABLE "imagenes" (
    "id" SERIAL NOT NULL,
    "enlace" TEXT NOT NULL,
    "idComentario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "imagenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentarios" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "puntaje" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imagenes" ADD CONSTRAINT "imagenes_idComentario_fkey" FOREIGN KEY ("idComentario") REFERENCES "comentarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
