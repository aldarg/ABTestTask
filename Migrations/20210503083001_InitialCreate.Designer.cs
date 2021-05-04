﻿// <auto-generated />
using System;
using ABTestTask.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ABTestTask.Migrations
{
    [DbContext(typeof(UserActivityDbContext))]
    [Migration("20210503083001_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ABTestTask.Models.UserActivity", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateLastAct")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateReg")
                        .HasColumnType("datetime2");

                    b.Property<int>("UseId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("UserActivity");
                });
#pragma warning restore 612, 618
        }
    }
}
