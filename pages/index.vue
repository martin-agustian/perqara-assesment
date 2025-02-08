<script setup lang="ts">
  import Autoplay from "embla-carousel-autoplay";
  import Swal from "sweetalert2";

  // ** APIs
  import TrendingAPI from "@/apis/Trending.api";

  // ** Types
  import type { TrendingDT } from "@/types/models/Trending.model";

  // ** Helpers
  import { imageFullPath } from "@/helpers/utils.helper";

  const plugin = Autoplay({
    delay: 3000,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
  });

  const loading = ref<Boolean>(true);
  const trendings = ref<TrendingDT[]>([]);

  const getTrending = async () => {
    try {
      loading.value = true;

      let trendingAPI = await TrendingAPI.All();

      if (trendingAPI.status === 200) {
        trendings.value = trendingAPI.data.results.slice(0, 6);
      }
    }
    catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error as string,
        icon: "error"
      });
    }
    finally {
      loading.value = false;
    }
  }

  onMounted(async () => {
    getTrending()
  })
</script>

<template>
	<div>
    <div class="py-10">
      <Carousel class="relative py-10" :opts="{ loop: true }" :plugins="[plugin]">
        <CarouselContent>
          <CarouselItem v-for="(treding, i) in trendings" :key="i" class="max-w-[540px] mx-[10px]">
            <div class="flex gap-[50px] bg-black p-3">
              <img :src="imageFullPath(treding.poster_path)" class="w-[200px] scale-125" />
              
              <div class="flex flex-col gap-[5px]">
                <div class="flex gap-[5px] items-center font-semibold text-[18px]">
                  <img src="../public/icon-star.svg" /> {{ treding.vote_average }}
                </div>
                <div class="text-[25px] font-medium">
                  {{ treding.name }}
                </div>
                <div class="text-[16px] flex gap-[8px] items-center">
                  2021 <img src="../public/icon-ellipse.svg" /> Sci-Fi
                </div>
                <div class="text-[12px]">
                  {{ treding.overview }}
                </div>
              </div>
            </div>
          </CarouselItem>         
        </CarouselContent>
      </Carousel>

      <div class="flex space-x-3 justify-center mt-10">
        <button type="button" v-for="(_, i) in trendings" :key="i" class="w-3 h-3 bg-mountain-mist rounded-full"></button>
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
