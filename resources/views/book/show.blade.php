@extends('layouts.app')

@section('styles')
    <link href="{{ asset('pflip/css/pdfflip.css') }}" rel="stylesheet" type="text/css">
@endsection


@section('content')
    <header class="bg-blue-900 py-6">
        <div class="container mx-auto flex justify-between items-center px-6">
            <div>
                <button onclick="window.history.back()" class="text-lg font-semibold text-gray-100 no-underline">
                    <h2>
                        {{ trans('general.back') }}
                    </h2>
                </button>
            </div>
        </div>
    </header>
    <div class="PDFFlip"
         style="width: 100%; height: auto;"
         id="PDFF" source="{{ asset(env('FILES').$element->file) }}"></div>
@endsection

@section('scripts')
    <script src="{{ asset('pflip/js/libs/jquery.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('pflip/js/pdfflip.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/settings.js') }}" type="text/javascript"></script>
    <script>
        var option_PDFF = {
            /* BASIC SETTINGS */

            openPage: 1,

            height: '1000',

            enableSound: true,

            downloadEnable: {{ $element->download ? 'true' : 'false' }},

            direction: {{ app()->getLocale() === 'ar' ? 2 : 1 }},

            autoPlay: true,

            autoPlayStart: false,

            autoPlayDuration: 3000,

            autoEnableOutline: false,

            autoEnableThumbnail: false,


            /* TRANSLATE INTERFACE */



            text: {

                toggleSound: "Sound",

                toggleThumbnails: "Thumbnails",

                toggleOutline: "Contents",

                previousPage: "{{ trans('general.previous_page') }}",

                nextPage: "{{ trans('general.next_page') }}",

                toggleFullscreen: "{{ trans('general.full_screen') }}",

                zoomIn: "{{ trans('general.zoom_in') }}",

                zoomOut: "{{ trans('general.zoom_out') }}",

                downloadPDFFile: "{{ trans('general.download') }}",

                gotoFirstPage: "{{ trans('general.first_page') }}",

                gotoLastPage: "{{ trans('general.last_page') }}",

                play: "{{ trans('general.play') }}",

                pause: "{{ trans('general.pause') }}",

                share: "{{ trans('general.share') }}"

            },


            /* ADVANCED SETTINGS */



            hard: "none",

            overwritePDFOutline: true,

            duration: 1000,

            pageMode: pdfflip.PAGE_MODE.AUTO,

            singlePageMode: pdfflip.SINGLE_PAGE_MODE.AUTO,

            transparent: false,

            scrollWheel: true,

            zoomRatio: 1.5,

            maxTextureSize: 1600,

            {{--backgroundImage: "{{ asset(env('THUMBNAIL').$element->image) }}",--}}

            backgroundColor: "#fff",

            controlsPosition: pdfflip.CONTROLSPOSITION.BOTTOM,

            allControls: "thumbnail,play,startPage,altPrev,pageNumber,altNext,endPage,zoomIn,zoomOut,fullScreen,download,sound,share",

            hideControls: "outline",


        };


    </script>
    <script src="{{ asset('js/toc.js') }}" type="text/javascript"></script>
@endsection
