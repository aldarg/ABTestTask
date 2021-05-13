﻿// <auto-generated />
using System;
using ABTestTask.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ABTestTask.Migrations
{
    [DbContext(typeof(UserActivityDbContext))]
    partial class UserActivityDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.5")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("ABTestTask.Models.UserActivity", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("DateLastAct")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("date_last_activity");

                    b.Property<DateTime>("DateReg")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("date_registration");

                    b.Property<int>("Lifetime")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("integer")
                        .HasColumnName("lifetime")
                        .HasComputedColumnSql("DATE_PART('day', date_last_activity - date_registration)", true);

                    b.Property<int>("UserId")
                        .HasColumnType("integer")
                        .HasColumnName("user_id");

                    b.HasKey("ID");

                    b.ToTable("UserActivity");
                });
#pragma warning restore 612, 618
        }
    }
}
