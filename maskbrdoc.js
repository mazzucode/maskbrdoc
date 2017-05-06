/**
 * maskbrdoc for jQuery, version 1.0.0 (https://github.com/masimao/maskbrdoc)
 * (c) 2016 Márcio Mazzucato (https://github.com/masimao)
 *
 * maskbrphone for jQuery is freely distributable under the terms of an MIT-style license.
 */
(function($) {

    $.fn.maskbrdoc = function() {

        var plugin = this;

        var initialize = function() {

            return plugin.each( function() {
                $(this).val(applyMask($(this).val()));

                $(this).keyup(function() {
                    $(this).val(applyMask($(this).val()));
                });
            });
        };

        var applyMask = function(input) {

            if ( ! input.length) {
                return '';
            }

            var doc = input.replace(/\D/g, ''); // Remove tudo o que não for dígito
            var maskedDoc;

            if (doc.length <= 11) {
                maskedDoc = doc
                                .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos
                                .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
                                .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
            } else {
                maskedDoc = doc
                                .replace(/^(\d{2})(\d)/, '$1.$2') // Coloca ponto entre o segundo e o terceiro dígitos
                                .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca ponto entre o quinto e o sexto dígitos
                                .replace(/\.(\d{3})(\d)/, '.$1/$2') // Coloca uma barra entre o oitavo e o nono dígitos
                                .replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
            }

            return maskedDoc.substring(0, 18);
        };

        initialize();

    };

}(jQuery));
