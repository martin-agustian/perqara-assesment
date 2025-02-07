<script setup lang="ts">
  import Autoplay from "embla-carousel-autoplay";

  const plugin = Autoplay({
    delay: 3000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });
</script>

<template>
	<div>
    <div class="py-[50px]">
      <Carousel class="relative" :opts="{ loop: true }" :plugins="[plugin]">
        <CarouselContent>
          <CarouselItem class="max-w-[540px] mx-[10px]">
            <div class="flex gap-[50px] bg-black p-3">
              <img src="../public/poster.svg" class="scale-125" />
              
              <div class="flex flex-col gap-[5px]">
                <div class="flex gap-[5px] items-center font-semibold text-[18px]">
                  <img src="../public/icon-star.svg" /> 7.3
                </div>
                <div class="text-[25px] font-medium">
                  Space Sweepers
                </div>
                <div class="text-[16px] flex gap-[8px] items-center">
                  2021 <img src="../public/icon-ellipse.svg" /> Sci-Fi
                </div>
                <div class="text-[12px]">
                  When the crew of a space junk collector ship called The Victory discovers a humanoid 
                  robot named Dorothy that's known to be a weapon of mass destruction, they get involved 
                  in a risky business deal which puts their lives at stake.
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem class="max-w-[540px] mx-[10px]">
            <div class="flex gap-[50px] bg-black p-3">
              <img src="../public/poster.svg" class="scale-125" />
              
              <div class="flex flex-col gap-[5px]">
                <div class="flex gap-[5px] items-center font-semibold text-[18px]">
                  <img src="../public/icon-star.svg" /> 7.3
                </div>
                <div class="text-[25px] font-medium">
                  Space Sweepers
                </div>
                <div class="text-[16px] flex gap-[8px] items-center">
                  2021 <img src="../public/icon-ellipse.svg" /> Sci-Fi
                </div>
                <div class="text-[12px]">
                  When the crew of a space junk collector ship called The Victory discovers a humanoid 
                  robot named Dorothy that's known to be a weapon of mass destruction, they get involved 
                  in a risky business deal which puts their lives at stake.
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem class="max-w-[540px] mx-[10px]">
            <div class="flex gap-[50px] bg-black p-3">
              <img src="../public/poster.svg" class="scale-125" />
              
              <div class="flex flex-col gap-[5px]">
                <div class="flex gap-[5px] items-center font-semibold text-[18px]">
                  <img src="../public/icon-star.svg" /> 7.3
                </div>
                <div class="text-[25px] font-medium">
                  Space Sweepers
                </div>
                <div class="text-[16px] flex gap-[8px] items-center">
                  2021 <img src="../public/icon-ellipse.svg" /> Sci-Fi
                </div>
                <div class="text-[12px]">
                  When the crew of a space junk collector ship called The Victory discovers a humanoid 
                  robot named Dorothy that's known to be a weapon of mass destruction, they get involved 
                  in a risky business deal which puts their lives at stake.
                </div>
              </div>
            </div>
          </CarouselItem>

          <CarouselItem class="max-w-[540px] mx-[10px]">
            <div class="flex gap-[50px] bg-black p-3">
              <img src="../public/poster.svg" class="scale-125" />
              
              <div class="flex flex-col gap-[5px]">
                <div class="flex gap-[5px] items-center font-semibold text-[18px]">
                  <img src="../public/icon-star.svg" /> 7.3
                </div>
                <div class="text-[25px] font-medium">
                  Space Sweepers
                </div>
                <div class="text-[16px] flex gap-[8px] items-center">
                  2021 <img src="../public/icon-ellipse.svg" /> Sci-Fi
                </div>
                <div class="text-[12px]">
                  When the crew of a space junk collector ship called The Victory discovers a humanoid 
                  robot named Dorothy that's known to be a weapon of mass destruction, they get involved 
                  in a risky business deal which puts their lives at stake.
                </div>
              </div>
            </div>
          </CarouselItem>
         
        </CarouselContent>
      </Carousel>

      <div class="flex space-x-3 justify-center mt-5">
        <button type="button" class="w-3 h-3 bg-white rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 bg-white rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 bg-white rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 bg-white rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 bg-white rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
      </div>
    </div>

		<div class="relative mt-[50px]">
			<div class="h-[250px] w-full bg-ebony-clay absolute top-[-30px] z-[-1]" />

			<Container>
				<div class="flex justify-between items-center mb-5">
					<TitleHead> discover movie </TitleHead>

					<div class="flex gap-[10px]">
						<Capsule> Popularity </Capsule>

						<Capsule variant="secondary"> Release Date </Capsule>
					</div>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[15px]">
					<Movie />
					<Movie />
					<Movie />
					<Movie />
					<Movie />
				</div>
			</Container>
		</div>
	</div>
</template>
