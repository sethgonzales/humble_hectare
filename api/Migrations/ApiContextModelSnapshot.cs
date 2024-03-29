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

                    b.HasData(
                        new
                        {
                            CropId = 1,
                            Name = "Tomato"
                        },
                        new
                        {
                            CropId = 2,
                            Name = "Grape"
                        },
                        new
                        {
                            CropId = 3,
                            Name = "Pear"
                        },
                        new
                        {
                            CropId = 4,
                            Name = "Blackberry"
                        });
                });

            modelBuilder.Entity("Api.Models.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

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

                    b.Property<double>("Yield")
                        .HasColumnType("double");

                    b.Property<string>("YieldUnit")
                        .HasColumnType("longtext");

                    b.HasKey("EventId");

                    b.HasIndex("VarietalId");

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            EventId = 1,
                            EventType = "Process",
                            VarietalId = 1,
                            Yield = 0.0
                        },
                        new
                        {
                            EventId = 2,
                            EventType = "Water",
                            VarietalId = 2,
                            Yield = 0.0
                        },
                        new
                        {
                            EventId = 3,
                            EventType = "Harvest",
                            VarietalId = 2,
                            Yield = 0.0
                        });
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

                    b.HasKey("VarietalId");

                    b.HasIndex("CropId");

                    b.ToTable("Varietals");

                    b.HasData(
                        new
                        {
                            VarietalId = 1,
                            CropId = 1,
                            Description = "Small, sweet tomato variety.",
                            Name = "Cherry"
                        },
                        new
                        {
                            VarietalId = 2,
                            CropId = 1,
                            Description = "Meatier, less juicy tomato variety.",
                            FertilizeEvery = "week",
                            Name = "Roma",
                            WaterEvery = "day"
                        },
                        new
                        {
                            VarietalId = 3,
                            CropId = 2,
                            Description = "Red wine grape variety.",
                            FertilizeEvery = "month",
                            Name = "Cabernet Sauvignon",
                            WaterEvery = "day"
                        },
                        new
                        {
                            VarietalId = 4,
                            CropId = 2,
                            Description = "White wine grape variety.",
                            Name = "Chardonnay"
                        },
                        new
                        {
                            VarietalId = 5,
                            CropId = 3,
                            Description = "Not sure how to describe this.",
                            Name = "Asian"
                        });
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
