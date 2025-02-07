<script setup lang="ts">
  onMounted(() => {

  });
</script>

<template>
	<div>
    <div class="p-[100px]">
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
