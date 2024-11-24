-- DropForeignKey
ALTER TABLE "RoleResource" DROP CONSTRAINT "RoleResource_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "RoleResource" DROP CONSTRAINT "RoleResource_roleId_fkey";

-- DropForeignKey
ALTER TABLE "userRole" DROP CONSTRAINT "userRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "userRole" DROP CONSTRAINT "userRole_userId_fkey";

-- AddForeignKey
ALTER TABLE "userRole" ADD CONSTRAINT "userRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userRole" ADD CONSTRAINT "userRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleResource" ADD CONSTRAINT "RoleResource_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleResource" ADD CONSTRAINT "RoleResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
