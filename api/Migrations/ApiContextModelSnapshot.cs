﻿// <auto-generated />
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(ApiContext))]
    partial class ApiContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Api.Models.Crop", b =>
                {
                    b.Property<int>("CropId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Type")
                        .HasColumnType("longtext");

                    b.HasKey("CropId");

                    b.ToTable("Crops");
                });

            modelBuilder.Entity("Api.Models.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CropVarietal")
                        .HasColumnType("longtext");

                    b.Property<string>("DateEnd")
                        .HasColumnType("longtext");

                    b.Property<string>("DateStart")
                        .HasColumnType("longtext");

                    b.Property<string>("EventType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Notes")
                        .HasColumnType("longtext");

                    b.Property<int>("VarietalId")
                        .HasColumnType("int");

                    b.Property<string>("Yield")
                        .HasColumnType("longtext");

                    b.HasKey("EventId");

                    b.HasIndex("VarietalId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Api.Models.Varietal", b =>
                {
                    b.Property<int>("VarietalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CropId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("longtext");

                    b.Property<string>("FertilizeEvery")
                        .HasColumnType("longtext");

                    b.Property<string>("FertilizeStart")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("WaterEvery")
                        .HasColumnType("longtext");

                    b.Property<string>("WaterStart")
                        .HasColumnType("longtext");

                    b.Property<int>("WaterTime")
                        .HasColumnType("int");

                    b.HasKey("VarietalId");

                    b.HasIndex("CropId");

                    b.ToTable("Varietals");
                });

            modelBuilder.Entity("Api.Models.Event", b =>
                {
                    b.HasOne("Api.Models.Varietal", "Varietal")
                        .WithMany("Events")
                        .HasForeignKey("VarietalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Varietal");
                });

            modelBuilder.Entity("Api.Models.Varietal", b =>
                {
                    b.HasOne("Api.Models.Crop", "Crop")
                        .WithMany("Varietals")
                        .HasForeignKey("CropId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Crop");
                });

            modelBuilder.Entity("Api.Models.Crop", b =>
                {
                    b.Navigation("Varietals");
                });

            modelBuilder.Entity("Api.Models.Varietal", b =>
                {
                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
