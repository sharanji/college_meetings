-- CreateTable
CREATE TABLE "Attendence" (
    "id" SERIAL NOT NULL,
    "meetId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "attendenace" INTEGER NOT NULL,

    CONSTRAINT "Attendence_pkey" PRIMARY KEY ("id")
);
