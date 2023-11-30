function About() {
  return (
    <div className="min-h-screen relative">
      <div className="bg-orange-200 w-screen h-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-10/12 h-1/2 bg-slate-300 opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 w-full md:w-2/3 lg:w-1/2">
        <div className="w-full text-center font-bold text-4xl pb-8 sm:pb-14">
          TeloMere RAS
        </div>
        <div className="font-medium px-5 break-all">
          TMRAS는 공간을 창조하고 가공하는 일 뿐만 아니라, 노후화된 구조물을
          재생하는 역할을 합니다. 건축 기반의 엔지니어링 기술과 BIM, 3D 스캐닝,
          드론 및 Reality Capture와 같은 혁신적인 기술을 결합하여 더 생생하고
          정확한 3차원 가상환경을 제공합니다. 4차 산업혁명 시대, 스캔비는 디지털
          트윈 데이터를 생성하여 건축물의 노후도를 분석하며, 높은 정밀도와
          현실감 있는 3D 모델을 기반으로 건축뿐아니라 3D 엔터테인먼트 분야를
          지원합니다.
        </div>
        <br />
        <div className="font-medium px-5 break-all">
          저희의 역할은 세포내 염색체말단인 텔로미어가 손상되어 노화가일어나면
          텔로미어라아제를 통해 복구되는것처럼 노후화된 구조물을 복구하고
          재생시켜 빈집의 생애를 늘려주고 또다른 기능 또다른 삶을
          제공하는것입니다.
        </div>
      </div>
    </div>
  );
}

export default About;
