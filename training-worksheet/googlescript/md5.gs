/**
 * ------------------------------------------
 *   MD5 function for GAS(GoogleAppsScript)
 *
 * You can get a MD5 hash value and even a 4digit short Hash value of a string.
 * ------------------------------------------
 * Usage1:
 *   `=MD5("YourStringToHash")`
 *     or
 *   `=MD5( A1 )` with the same string at A1 cell
 *   result:
 *     `FCE7453B7462D9DE0C56AFCCFB756193`.
 *     For your sure-ness you can verify it in your terminal as below.
 *     `$ md5 -s "YourStringToHash"`
 * Usage2:
 *   `=MD5("YourStringToHash", true)` for short Hash
 *    result:
 *     `6MQH`
 *     Note that it has more conflict probability.

 */
function MD5( input, isShortMode )
{
    var isShortMode = !!isShortMode; // Be sure to be bool
    var txtHash = '';
    var rawHash = Utilities.computeDigest(
                      Utilities.DigestAlgorithm.MD5,
                      input );
 
    if ( ! isShortMode ) {
        for ( i = 0; i < rawHash.length; i++ ) {

            var hashVal = rawHash[i];

            if ( hashVal < 0 ) {
                hashVal += 256;
            };
            if ( hashVal.toString( 16 ).length == 1 ) {
                txtHash += '0';
            };
            txtHash += hashVal.toString( 16 );
        };
    } else {
        for ( j = 0; j < 16; j += 8 ) {

            hashVal = ( rawHash[j]   + rawHash[j+1] + rawHash[j+2] + rawHash[j+3] )
                    ^ ( rawHash[j+4] + rawHash[j+5] + rawHash[j+6] + rawHash[j+7] );

            if ( hashVal < 0 ) {
                hashVal += 1024;
            };
            if ( hashVal.toString( 36 ).length == 1 ) {
                txtHash += "0";
            };

            txtHash += hashVal.toString( 36 );
        };
    };

    // change below to "txtHash.toUpperCase()" if needed
    return txtHash;

}
